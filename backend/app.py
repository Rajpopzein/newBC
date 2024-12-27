from fastapi import FastAPI, HTTPException, Depends, status
from pydantic import BaseModel, field_validator, EmailStr, Field
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from passlib.context import CryptContext
from fastapi.middleware.cors import CORSMiddleware
from jose import JWTError, jwt
from datetime import datetime, timedelta
from typing import Optional, List
from models.userModel import Users, userRole, Status, stratagyData
from config.dbconnection import sessionLocal
from sqlalchemy.orm import Session
from sqlalchemy import exc
from config.dbconnection import engine, base


# Initialize the FastAPI app
app = FastAPI()

# JWT configuration
SECRET_KEY = "your_secret_key"  # Replace with a strong secret key
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Add CORS middleware to allow cross-origin requests
origins = [
    "http://localhost:3000",  # Replace with your frontend URL, e.g., React app
    "https://yourfrontenddomain.com",
    "http://localhost:5173",
    # Another domain that needs access
    # You can add more origins here as needed
]

# Add CORSMiddleware to the app
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allows all listed origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Password hashing
pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")

# OAuth2 scheme
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def get_db():
    db = sessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_current_user(
    token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)
):
    print(token)
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("email")
        if email is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        user = db.query(Users).filter(Users.email == email).first()
        if user is None:
            raise HTTPException(status_code=401, detail="User not found")
        return user
    except JWTError as error:
        print(error)
        raise HTTPException(status_code=401, detail="Invalid token")


class Token(BaseModel):
    access_token: str
    token_type: str


class StrategyDataIn(BaseModel):
    stratagyData: dict


class StrategyDataOut(StrategyDataIn):
    id: int

class UserCreate(BaseModel):
    firstName: str
    lastName: Optional[str] = None
    email: EmailStr
    password: str
    role: Optional[int] = 2  # Default role
    userStatus: Optional[int] = 1  # Default user status

    class Config:
        orm_mode = True


class TradeDataRequest(BaseModel):
    broker: str
    Date: str  # Use string format (e.g., 'YYYY-MM-DD HH:MM:SS') for date
    tradeId: int
    strategy: str
    counter: Optional[int] = None
    buyValue: int
    sellValue: int

    # Pydantic validator for Date field to ensure correct datetime format
    @field_validator("Date")
    def validate_date(cls, v):
        try:
            return datetime.strptime(v, "%Y-%m-%d %H:%M:%S")
        except ValueError:
            raise ValueError("Date must be in the format YYYY-MM-DD HH:MM:SS")


class UserResponse(BaseModel):
    id: int
    firstName: str
    lastName: str
    email: str
    role: str
    userStatus: str
    createAt: datetime
    # updatedAt: datetime

    class Config:
        orm_mode = True


# Helper functions
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=90))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


# def get_user(username: str):
#     return users_db.get(username)

@app.on_event("startup")
async def create_tables():
    base.metadata.create_all(bind=engine)
    print("All tables created successfully.")

# API Endpoints
@app.post("/register")
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(Users).filter(Users.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email is already registered")

    # Hash the password
    hashed_password = get_password_hash(user.password)

    # Create a new user record
    db_user = Users(
        firstName=user.firstName,
        lastName=user.lastName,
        email=user.email,
        pwd=hashed_password,
        role=user.role,
        userStatus=user.userStatus,
        createAt=datetime.now(),
        updatedAt=datetime.now(),
    )

    # Add the user to the database
    try:
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return {"message": "User Created successfully"}
    except exc.SQLAlchemyError as e:
        db.rollback()
        print("Error", e)
        raise HTTPException(status_code=500, detail="Database error")
    except Exception as err:
        print("Error", err)
        raise HTTPException(status_code=500, detail="internal server error")


@app.post("/login", response_model=Token)
def login_user(
    db: Session = Depends(get_db), form_data: OAuth2PasswordRequestForm = Depends()
):
    user = db.query(Users).filter(Users.email == form_data.username).first()
    if user is None or not verify_password(form_data.password, user.pwd):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Create the JWT token
    access_token = create_access_token(
        data={"email": user.email, "role": user.role, "userId": user.id}
    )
    return {"access_token": access_token, "token_type": "bearer"}


@app.get("/users", response_model=List[UserResponse])
async def get_users(
    db: Session = Depends(get_db),
    current_user: UserResponse = Depends(get_current_user),
):
    """
    Fetch all users from the database.
    This is a protected route that requires JWT token to access.
    """
    try:
        outPut = []
        # Query all users
        print("current user: %s" % current_user.id)
        users = (
            db.query(Users, userRole, Status)
            .join(userRole, Users.role == userRole.id)
            .join(Status, Users.userStatus == Status.id)
            .filter(Users.id != current_user.id)
            .all()
        )
        for userdata, roledata, statusdata in users:
            outPut.append(
                {
                    "id": userdata.id,
                    "firstName": userdata.firstName,
                    "lastName": userdata.lastName,
                    "email": userdata.email,
                    "role": roledata.roleName,
                    "userStatus": statusdata.statusName,
                    "createAt": userdata.createAt,
                }
            )
        return outPut
    except exc.SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail="Database error occurred")


@app.post("/data")
async def create_data(
    data: dict,
    db: Session = Depends(get_db),
    current_user: UserResponse = Depends(get_current_user),
):
    db_strategy = stratagyData(stratagyData=data, userId=current_user.id)
    db.add(db_strategy)
    db.commit()
    db.refresh(db_strategy)
    return {
        "message": "Strategy created successfully",
        "id": db_strategy.id,
        "stratagyData": db_strategy.stratagyData,
        "userId": db_strategy.userId,
    }


@app.get("/dataById")
async def read_data_by_user_id(
    db: Session = Depends(get_db),
    current_user: UserResponse = Depends(get_current_user),
):
    data = db.query(stratagyData).filter(stratagyData.userId == current_user.id).all()
    if not data:
        raise HTTPException(
            status_code=404, detail="No data found for the specified user ID"
        )
    return data
