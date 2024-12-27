from pydantic import BaseModel
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, JSON
from datetime import datetime
from config.dbconnection import engine, base


base = base


class userRole(base):
    __tablename__ = "userRole"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    roleName = Column(String(50), index=True, nullable=False)


class Status(base):
    __tablename__ = "status"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    statusName = Column(String(50), index=True, nullable=False)


class Users(base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    firstName = Column(String(100), index=True, nullable=False)
    lastName = Column(String(100), index=True, nullable=True)
    email = Column(String(200), unique=True, index=True, nullable=False)
    role = Column(
        Integer,
        ForeignKey("userRole.id"),
        nullable=False,
        index=True,
        default=2,
    )
    pwd = Column(String(255))
    userStatus = Column(Integer, ForeignKey("status.id"), index=True, default=1)
    createAt = Column(DateTime, index=True, default=datetime.now)
    updatedAt = Column(DateTime, index=True, default=datetime.now)


class stratagyData(base):
    __tablename__ = "stratagyData"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    stratagyData = Column(JSON)
    userId = Column(Integer, ForeignKey("users.id"), nullable=False)


class RegisterUser(BaseModel):
    firstName: str
    lastName: str
    email: str
    role: str
    pwd: str


class Token(BaseModel):
    access_token: str
    token_type: str


if __name__ == "__main__":
    base.metadata.create_all(engine)
    print("Tables created successfully.")
