import {
  faPenToSquare,
  faSquarePlus,
} from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Drawer } from "antd";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/loginContext";
import { deleteAddress, getLoginUser, updateUser } from "../helper/helper";
import AddAddres from "./AddAddres";
import PopUpModel from "./PopUpModel";

import api from "../api/Axios";
import { ToastContext } from "../context/ToastContext";

const Address = () => {
  const { user, setLoginData } = useContext(AuthContext);
  const [openSuccesModel, setOpenSuccessModel] = useState({
    isOpen: false,
    id: null,
  });

  const { makeToast } = useContext(ToastContext);
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

  const handleDelete = async (id) => {
    console.log("id: ", id);
    // deleteAddress(id);
    try {
      const response = await api.delete(`user/${user._id}/${id}`);
      if (response.status === 200) {
        const { data } = response.data;
        makeToast("success", "Address deleted!");
        setOpenSuccessModel({
          isOpen: false,
          id: null,
        });
        updateUser(data);
        setLoginData(getLoginUser());
      }
    } catch (error) {}
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
              { _id, name, default: isDefault, address, city, addressType },
              index
            ) => (
              <div key={index} className="h-[150px] p-3 border  rounded-md">
                <div className="flex justify-between  h-full">
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
                  <div className="flex gap-3 items-center justify-center h-full">
                    <button
                      className="hover:opacity-50"
                      onClick={() => {
                        showChildrenDrawer(true, _id);
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        className="h-4 w-4"
                      />
                    </button>
                    <button
                      className="text-btnColor hover:opacity-50"
                      onClick={() =>
                        setOpenSuccessModel({ isOpen: true, id: _id })
                      }
                    >
                      <FontAwesomeIcon icon={faTrash} className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
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
      {openSuccesModel.isOpen && (
        <PopUpModel
          msg={"Are you sure you want to delete?"}
          setModel={setOpenSuccessModel}
          title={"Delete!"}
          type={"error"}
          onConfirm={() => handleDelete(openSuccesModel.id)}
        />
      )}
    </div>
  );
};

export default Address;
