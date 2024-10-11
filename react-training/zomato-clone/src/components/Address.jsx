import {
  faPenToSquare,
  faSquarePlus,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Drawer, Flex, Grid } from "antd";
import React, { useContext, useState } from "react";
import { deleteAddress, getLoginUser } from "../helper/helper";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import AddAddres from "./AddAddres";

const Address = () => {
  const navigator = useNavigate();
  const [user, setUser] = useState(getLoginUser().user);
  const [childrenDrawer, setChildrenDrawer] = useState({
    isOpen: false,
    editId: false,
    id: null,
  });
  const showChildrenDrawer = (isEdit = false, id = null) => {
    setChildrenDrawer({
      isOpen: true,
      isEdit,
      id,
    });
  };
  const onChildrenDrawerClose = () => {
    setChildrenDrawer({
      isOpen: false,
      editId: false,
      id: null,
    });
  };
  return (
    <div>
      <h1>Address</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
        <Card
          className="flex items-center justify-center text-center   w-full"
          hoverable
          onClick={() => {
            showChildrenDrawer();
          }}
        >
          <FontAwesomeIcon icon={faSquarePlus} className="h-5 w-5" />
          <p className="text-xl">Add Address</p>
        </Card>
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
              <Card key={id} className="h-[150px]">
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    {isDefault && (
                      <p className="text-btnColor">Default Address</p>
                    )}
                    <p>{addressType}</p>
                    <p>{name}</p>

                    <p>
                      {address} {city}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      className="hover:opacity-50"
                      onClick={() => {
                        showChildrenDrawer(true, id);
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        className="h-4 w-4"
                      />
                    </button>
                    <button
                      className="text-btnColor hover:opacity-50"
                      onClick={() => {
                        deleteAddress(id);
                        setUser(getLoginUser()?.user);
                      }}
                    >
                      <FontAwesomeIcon icon={faTrash} className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </Card>
            )
          )}
      </div>
      {childrenDrawer.isOpen && (
        <Drawer
          title="Address"
          width={500}
          closable={true}
          onClose={onChildrenDrawerClose}
          open={childrenDrawer.isOpen}
        >
          <AddAddres
            isEdit={childrenDrawer.isEdit}
            addressId={childrenDrawer.id}
            onChildrenDrawerClose={onChildrenDrawerClose}
          />
        </Drawer>
      )}
    </div>
  );
};

export default Address;
