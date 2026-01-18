import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  useDisclosure,
} from "@heroui/react";

const Menu = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [placement, setPlacement] = React.useState("left");

  const handleOpen = (placement) => {
    setPlacement(placement);
    onOpen();
  };

  return (
    <>
      <div className="flex flex-wrap gap-3 mt-100">
        <Button key={placement} className="capitalize" onPress={() => onOpen()}>
          Open {placement}
        </Button>
      </div>
      <Drawer isOpen={isOpen} placement="top" onOpenChange={onOpenChange}>
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1">
                Drawer Title
              </DrawerHeader>
              <DrawerBody>
                <Button>Link</Button>
              </DrawerBody>
              <DrawerFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Menu;
