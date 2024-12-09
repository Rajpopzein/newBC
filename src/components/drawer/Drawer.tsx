import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  useDisclosure,
  Button
} from "@nextui-org/react";

const DrawerComponent = () => {
  const { isOpen, onOpenChange, onClose } = useDisclosure();
  return (
    <Drawer isOpen={isOpen} onClose={onOpenChange} placement="right">
      <DrawerContent>
        <DrawerHeader>
          <h2>Drawer Header</h2>
        </DrawerHeader>
        <DrawerBody>
          <p>Drawer Body</p>
        </DrawerBody>
        <DrawerFooter>
          <button onClick={onOpenChange}>Close</button>
        </DrawerFooter>
      </DrawerContent>
      <DrawerFooter>
        <Button color="danger" variant="light" onPress={onClose}>
          Close
        </Button>
      </DrawerFooter>
    </Drawer>
  );
};
export default DrawerComponent;
