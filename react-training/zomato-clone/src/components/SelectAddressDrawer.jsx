import React, { useContext, useState } from "react";
import { Button, Card, Divider, Drawer } from "antd";
import {
  faPenToSquare,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddAddres from "./AddAddres";
import { AuthContext } from "../context/loginContext";
const SelectAddressDrawer = ({
  open,
  setOpen,
  childrenDrawer,
  setChildrenDrawer,
  showDrawer,
  onClose,
  showChildrenDrawer,
  onChildrenDrawerClose,
  setUserAddress,
}) => {
  const { user } = useContext(AuthContext);
  console.log("user: ", user);
  return (
    <>
      <Drawer
        title="Select Address"
        width={520}
        closable={true}
        onClose={onClose}
        open={open}
      >
        <Button onClick={showChildrenDrawer}>
          <FontAwesomeIcon icon={faPlus} /> Add new Address
        </Button>
        <Divider />
        <p>Saved Addesses</p>
        {user.address &&
          user.address.map(
            (
              {
                id,
                name,
                default: isDefault,
                phone,
                address,
                city,
                addressType,
              },
              index
            ) => (
              <Card
                key={id}
                className="my-2"
                hoverable
                onClick={() => {
                  setUserAddress(user.address[index]);
                  onClose();
                }}
              >
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    {isDefault && (
                      <p className="text-btnColor">Default Address</p>
                    )}
                    <p>{addressType}</p>
                    <p>{name}</p>
                    <p>{phone}</p>
                    <p>
                      {address} {city}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      className="hover:opacity-50"
                      onClick={(e) => {
                        e.stopPropagation();
                        showChildrenDrawer();
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        className="h-4 w-4"
                      />
                    </button>
                    <button className="text-btnColor hover:opacity-50">
                      <FontAwesomeIcon icon={faTrash} className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </Card>
            )
          )}

        <Drawer
          title="Address"
          width={520}
          closable={true}
          onClose={onChildrenDrawerClose}
          open={childrenDrawer}
        >
          <AddAddres />
        </Drawer>
      </Drawer>
    </>
  );
};
export default SelectAddressDrawer;
