import React, { useState, useEffect } from "react";
import {
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Box,
  Typography,
  Grid,
} from "@mui/material";
// import { makeStyles } from "@mui/styles";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import { styled } from "@mui/material/styles";
import api from "../../../components/api/api";
import { display } from "@mui/system";
import styled from "@emotion/styled";
import DialogForAPI from "../../../components/DialogForAPI";

const drawerHeight = "100%";
const drawerwidth = "100%";
const useStyles = styled((theme) => ({
  root: {
    height: drawerHeight,
    width: drawerwidth,
    marginTop: 20,
  },
  Padding: {
    paddingTop: "2%",
    paddingRight: "6%",
    paddingLeft: "6%",
    paddingBottom: "2%",
  },
  haft: { width: "45%" },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
  },
  Margin: {
    marginTop: 10,
  },
}));

export default function Role() {
  const classes = useStyles();

  const [RoleList, setRoleList] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [roleName, setRoleName] = useState("");
  const [message, setmessage] = useState("");
  const [open, setOpen] = useState(false);
  const [OpenEdit, setOpenEdit] = useState(false);
  const [RoleId, setRoleId] = useState("");
  const [openCancel, setOpenCancel] = useState(false);
  const [Loading, setLoading] = useState(false);

  // a little function to help us with reordering the result
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const items = reorder(
      RoleList,
      result.source.index,
      result.destination.index
    );

    setRoleList(items);
  };

  const fetchRoleList = async () => {
    try {
      const result = await api.get("api/v1.0/setting/role/list");
      const _result = result.data.result;
      setRoleList(_result);
    } catch (error) {
      console.log("error => ", error);
    }
  };

  const addRole = async () => {
    setLoading(true);
    const AddData = {
      roleID: "",
      roleName: roleName,
      level: RoleList.length + 1,
      status: true

    };

    const body = { roleAll: [...RoleList, AddData] };

    console.log(body)
    try {
      const result = await api
        .post("api/v1.0/setting/role/create", body.roleAll.map((value) => { return { "roleID": value.roleID, "roleName": value.roleName, "level": value.level, "status": value.status } }))
        .then((res) => {
          if (res) {
            setOpen(true);
            setmessage(res.data.message);
            setTimeout(() => {
              handleClose();
              setOpen(false);
            }, 2000);
            fetchRoleList();
          }
        });
      console.log(result);
    } catch (error) {
      console.log("error => ", error);
      setLoading(false);
    }
  };

  const EditRole = async () => {
    setLoading(true);
    const EditRole = RoleList.map((x, index) => ({
      roleID: x.roleID,
      roleName: x.roleName,
      status: x.status,
      level: index + 1,
    }));

    const body = { roleAll: EditRole };

    try {
      const result = await api
        .post("api/v1.0/setting/role/create", body.roleAll.map((value) => { return { "roleID": value.roleID, "roleName": value.roleName, "level": value.level, "status": value.status } }))
        .then((res) => {
          if (res) {
            setOpen(true);
            setmessage(res.data.message);
            setTimeout(() => {
              handleClose();
              setOpen(false);
            }, 2000);
            fetchRoleList();
          }
        });
    } catch (error) {
      console.log("error => ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoleList();
  }, []);

  const handleClose = () => {
    setOpenAdd(false);
    setOpen(false);
    setOpenEdit(false);
    setRoleName("");
    setRoleId("");
    setOpenCancel(false);
    setLoading(false);
  };

  const handleCloseDialog = (props) => {
    setOpen(props);
  };

  const handleEditRole = (Role) => {
    setRoleName(Role.roleName);
    setRoleId(Role.roleID);
    setOpenEdit(true);
  };

  const handleSaveEdit = () => {
    const selectedRole = RoleList.filter((x) => x.roleID === RoleId);

    selectedRole.forEach((x) => {
      x.roleName = roleName;
    });

    setRoleList([...RoleList]);

    EditRole();
  };

  const handleCancle = (RoleSelect) => {
    const cancelRole = RoleList.filter((x) => x.roleID === RoleSelect.roleID);

    cancelRole.forEach((x) => {
      x.status = false;
    });

    setRoleList([...RoleList]);

    setOpenCancel(true);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant='h4' sx={{ color: '#000', marginBottom:'20px' }}>เเอคชั่นทั้งหมด</Typography>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 8, md: 12 }}>
        <Grid item xs={2} sm={8} md={8}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <div className={classes.row}>
                    <div className={classes.haft}>
                      <div sx={{ maxHeight: "58vh", height: "58vh" }}>
                        <table style={{ width: "100%" }}>
                          {RoleList.map((Data, index) => (
                            <Draggable
                              key={Data.roleID}
                              draggableId={Data.roleID}
                              index={index}
                            >
                              {(provided, snapshot) => (
                                <tr
                                  key={Data.roleID}
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <td
                                    style={{
                                      display: "flex",
                                      border: "1px solid #e0e0e0",
                                    }}
                                  >
                                    <span style={{ margin: "10px 0px 10px 20px" }}>
                                      {Data.roleName}
                                    </span>
                                    <div
                                      style={{
                                        justifyContent: "flex-end",
                                        display: "flex",
                                        flexGrow: 1,
                                      }}
                                    >
                                      <button
                                        style={{
                                          border: 0,
                                          backgroundColor: "transparent",
                                        }}
                                      >
                                        <span
                                          className="material-icons"
                                          onClick={() => handleEditRole(Data)}
                                        >
                                          edit
                                        </span>
                                      </button>
                                      <button
                                        style={{
                                          border: 0,
                                          backgroundColor: "transparent",
                                        }}
                                      >
                                        <span
                                          className="material-icons-outlined"
                                          style={{ color: "#FF0000" }}
                                          onClick={() => handleCancle(Data)}
                                        >
                                          close
                                        </span>
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </Draggable>
                          ))}
                        </table>
                      </div>
                    </div>
                  </div>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </Grid>
        <Grid item xs={2} sm={8} md={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Button
            variant="contained"
            size="large"
            style={{
              color: "#1976d2",
              backgroundColor: "transparent",
              borderColor: "#1976d2",
              width: 120,
              textTransform: "lowercase",
            }}
            onClick={() => setOpenAdd(true)}
          >
            เพิ่ม
          </Button>
          <Dialog
            open={openAdd}
            onClose={handleClose}
            fullWidth={true}
            maxWidth="xs"
            classes={{ paper: classes.dialogPaper }}
          >
            <DialogContent>
              <TextField
                sx={{ width: "100%" }}
                size="small"
                onChange={(e) => setRoleName(e.target.value)}
                value={roleName}
                required
                // error={ExcelNameErr}
                label="ชื่อ"
              />
            </DialogContent>
            <DialogActions
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 20,
              }}
            >
              <Button
                variant="contained"
                style={{
                  color: "black",
                  borderColor: "transparent",
                  backgroundColor: "#F8F9FA",
                  padding: 10,
                  marginRight: 10,
                  width: 80,
                }}
                onClick={handleClose}
              >
                ยกเลิก
              </Button>
              <Button
                variant="contained"
                style={{
                  color: "white",
                  backgroundColor: "#1976d2",
                  borderColor: "transparent",
                  padding: 10,
                  marginRight: 10,
                  width: 80,
                }}
                onClick={() => addRole()}
              >
                ตกลง
              </Button>
            </DialogActions>
          </Dialog>
          <Button
            variant="contained"
            size="large"
            style={{
              color: "white",
              backgroundColor: "#1976d2",
              borderColor: "transparent",
              marginLeft: 10,
              width: 120,
              textTransform: "lowercase",
            }}
            onClick={() => EditRole()}
          >
            {Loading ? (
              <CircularProgress
                sx={{
                  color: "#FFFFFF",
                }}
                size={24}
              />
            ) : (
              "บันทึก"
            )}
          </Button>
        </Grid>
      </Grid>
      <Dialog
        open={OpenEdit}
        onClose={handleClose}
        fullWidth={true}
        maxWidth="xs"
        classes={{ paper: classes.dialogPaper }}
      >
        <DialogContent>
          <TextField
            sx={{ width: "100%" }}
            size="small"
            onChange={(e) => setRoleName(e.target.value)}
            value={roleName}
            required
            // error={ExcelNameErr}
            label="ชื่อ"
          />
        </DialogContent>
        <DialogActions
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <Button
            variant="contained"
            style={{
              color: "black",
              borderColor: "transparent",
              backgroundColor: "#F8F9FA",
              padding: 10,
              marginRight: 10,
              width: 80,
            }}
            onClick={handleClose}
          >
            ยกเลิก
          </Button>
          <Button
            variant="contained"
            style={{
              color: "white",
              backgroundColor: "#1976d2",
              borderColor: "transparent",
              padding: 10,
              marginRight: 10,
              width: 80,
            }}
            onClick={() => handleSaveEdit()}
          >
            {Loading ? (
              <CircularProgress
                sx={{
                  color: "#FFFFFF",
                }}
                size={24}
              />
            ) : (
              "ตกลง"
            )}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openCancel}
        onClose={handleClose}
        fullWidth={true}
        maxWidth="xs"
        classes={{ paper: classes.dialogPaper }}
      >
        <DialogTitle>ยืนยันที่จะลบหรือไม่</DialogTitle>
        <DialogActions
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <Button
            variant="contained"
            style={{
              color: "black",
              borderColor: "transparent",
              backgroundColor: "#F8F9FA",
              padding: 10,
              marginRight: 10,
              width: 80,
            }}
            onClick={handleClose}
          >
            ยกเลิก
          </Button>
          <Button
            variant="contained"
            style={{
              color: "white",
              backgroundColor: "#1976d2",
              borderColor: "transparent",
              padding: 10,
              marginRight: 10,
              width: 80,
            }}
            onClick={() => EditRole()}
          >
            {Loading ? (
              <CircularProgress
                sx={{
                  color: "#FFFFFF",
                }}
                size={24}
              />
            ) : (
              "ตกลง"
            )}
          </Button>
        </DialogActions>
      </Dialog>
      {/* <DialogForAPI
            DialogOpen={open}
            DialogClose={handleCloseDialog}
            message={message}
          /> */}
    </Box>

  );
}
