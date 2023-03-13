import {
  Paper,
  Checkbox,
  Button,
  Dialog,
  DialogContent,
  TextField,
  DialogActions,
  Grid,
  DialogTitle,
  CircularProgress,
  Select,
  Box,
  Typography,
} from "@mui/material";
// import { makeStyles } from "@mui/styles";
// import { red } from "@mui/material/colors";
import React, { useState, useEffect } from "react";
import api from '../../../components/api/api'
import qs from "qs";
import DialogForAPI from "../../../components/DialogForAPI";
// import "../css/styles.css";
import styled from "@emotion/styled";

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
}));
export default function SetPermissions() {
  const classes = useStyles();

  const [MenuList, setMenuList] = useState([]);
  const [SubMenuNo, setSubMenuNo] = useState("");
  const [MenuNo, setMenuNo] = useState("");
  const [ActionList, setActionList] = useState([]);
  const [Name, setName] = useState("");
  const [OpenEdit, setOpenEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const [Status, setStatus] = useState("Y");
  const [message, setmessage] = useState("");
  const [openCancel, setOpenCancel] = useState(false);
  const [ActionNo, setActionNo] = useState("");
  const [configActionID, setconfigActionID] = useState("");
  const [Loading, setLoading] = useState(false);
  const [RoleList, setRoleList] = useState([]);
  const [detail, setDetail] = useState([]);
  const [ActionRole, setActionRole] = useState([]);

  const fetchRoleList = async () => {
    try {
      const result = await api.get("api/v1.0/setting/role/list");
      const _result = result.data.result.map((x) => ({
        ...x,
        // selected: false,
      }));
      setRoleList(_result);
    } catch (error) {
      console.log("error => ", error);
    }
  };

  const fetchActionRole = async () => {
    try {
      const result = await api.get("api/v1.0/setting/configaction/list");
      const _result = result.data.result;
      setActionRole(_result);
      // CheckBoxIsTrue(_result);
    } catch (error) {
      console.log("error => ", error);
    }
  };

  const fetchMenuAll = async () => {
    try {
      const result = await api.get("api/v1.0/setting/menu/list");
      const _result = result.data.result;
      setMenuList(_result);
      setActionNo("");
    } catch (error) {
      console.log("error => ", error);
    }
  };

  const fetchActionMenu = async () => {
    try {
      const params = qs.stringify({
        ...(MenuNo && { MenuNo }),
        ...(SubMenuNo && { SubMenuNo }),
      });

      const result = await api.get(`api/v1.0/setting/configaction/list?${params}`);
      const _result = result.data.result;
      setActionList(_result);
    } catch (error) {
      console.log("error => ", error);
    }
  };

  const EditAndAddAction = async () => {
    const body = {
      MenuNo: MenuNo,
      SubMenuNo: SubMenuNo,
      ActionNo: ActionNo,
      ActionName: Name,
      Status: Status,
    };

    try {
      const result = await api
        .post("api/setting/actionmenu/add", body)
        .then((res) => {
          if (res) {
            setOpen(true);
            setmessage(res.data.message);
            setTimeout(() => {
              handleClose();
              setOpen(false);
            }, 2000);
            fetchActionMenu();
          }
        });
      console.log(result);
    } catch (error) {
      console.log("error => ", error);
    }
  };

  const saveRole = async () => {
    setLoading(true);
    const setDetail = detail.map((x, index) => ({
      configActionID: ActionRole.filter((item) => item.roleID === x.roleID && item.actionNo === ActionNo).map((cogId) => cogId.configActionID) || "",
      actionNo: ActionNo,
      roleID: x.roleID,
      status: x.selected === true ? true : false,
    }));

    const body = { detail: setDetail };
    console.log(body);


    try {
      const result = await api
        .post("api/v1.0/setting/configaction/create",
        body.detail.map((value) => { return { "configActionID": value.configActionID[0], "roleID": value.roleID, "actionNo": value.actionNo, "status": value.status } })
      )
        .then((res) => {
          if (res) {
            setOpen(true);
            setmessage(res.data.message);
            setTimeout(() => {
              handleCloseDialog();
              setOpen(false);
              setLoading(false);
            }, 2000);
            // fetchActionRole();
            // console.log('gg')
            alert('บันทึกเรียบร้อย')             
            window.location.reload(false);
          }
        });
    } catch (error) {
      console.log("error => ", error);
      setLoading(false);
    }
  };

  const setSelectedRole = () => {
    const roles = ActionRole.filter((x) => x.actionNo === ActionNo);
    const roleIds = roles.map((x) => x.roleID);
    const configIds = roles.map((x) => x.configActionID);

    console.log(configIds)
    const roleList = [...RoleList]; // clone deep
    // RoleList[0].selected = 0

    for (let r of roleList) {
      r.selected = roleIds.indexOf(r.roleID) > -1 ? true : false;
    }

    setRoleList([...roleList]);

    // setRoleList(RoleList.map((x) => ({ ...x, selected: true })));
  };

  useEffect(() => {
    async function fetchData() {
      await fetchMenuAll();
      await fetchActionRole();
      if (MenuNo || SubMenuNo) {
        await fetchActionMenu();
      }
    }
    fetchData();
  }, [SubMenuNo]);

  useEffect(() => {
    async function fetchData() {
      await fetchActionRole();
      if (ActionNo) {
        await setSelectedRole();
      }
    }
    fetchData();
  }, [ActionNo]);

  useEffect(() => {
    async function fetchData() {
      await fetchRoleList();
    }
    fetchData();
  }, []);

  const handleClose = () => {
    setOpen(false);
    setOpenEdit(false);
    setOpenCancel(false);
    setName("");
    setMenuNo("");
    setSubMenuNo("");
    setStatus(true);
    setLoading(false);
  };

  const handleCloseDialog = (props) => {
    setOpen(props);
  };

  const handleSaveEditAction = () => {
    const selectedAction = ActionList.filter((x) => x.actionNo === ActionNo);

    selectedAction.forEach((x) => {
      x.actionName = Name;
    });

    setActionList([...ActionList]);

    EditAndAddAction();
  };

  const handleCancelAction = (ActionSelect) => {
    //need Data
    setMenuNo(MenuNo);
    setSubMenuNo(ActionSelect.subMenuNo);
    setActionNo(ActionSelect.actionNo);
    setStatus("N");

    setOpenCancel(true);
  };

  const handleEditAndAddAction = (Data) => {
    //need Data
    setMenuNo(MenuNo);
    setSubMenuNo(Data.subMenuNo);
    setName(Data.actionName);
    setActionNo(Data.actionNo);
    setOpenEdit(true);
  };

  const handleClickSubForAction = (Data) => {
    setSubMenuNo(Data.subMenuNo);
    setMenuNo(Data.menuNo);
  };

  const handleCheckBox = (role, index, checked) => {
    const _roleList = RoleList.map((item, index2) =>
      index === index2 ? { ...item, selected: checked } : item
    );

    setRoleList(_roleList);
    setDetail(_roleList);
  };

  // console.log(ActionRole)

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant='h4' sx={{ color: '#000' }}>ผู้ใช้ทั้งหมด</Typography>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 8, md: 12 }}>
        <Grid item xs={2} sm={8} md={4}>
          <Typography variant='h6' sx={{ margin: '20px 0', color: 'primary.main' }}>Category</Typography>
          <div sx={{ maxHeight: "58vh", height: "58vh" }}>
            <table style={{ width: "100%", maxWidth: "100%" }}>
              {MenuList.map((Data, index) => (
                <tbody>
                  <tr key={index}>
                    <td
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        color: "#1976d2",
                        fontSize: "20px",
                        fontWeight: 'bold',

                      }}
                      onClick={() => setMenuNo(Data.menuNo)}
                    >
                      <span
                        style={{
                          margin: "10px 0px 10px 20px",
                          color: '#000'
                        }}
                      >
                        {Data.menuName}
                      </span>
                    </td>
                    {MenuList.find(
                      (x) => x.menuNo === Data.menuNo
                    ).subMenu.map((sub) => (
                      <td
                        className="table-list-group-item-action"
                        style={
                          sub.subMenuNo === SubMenuNo
                            ? {
                              display: "flex",
                              backgroundColor: "#f5f5f5",
                              boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px",
                              color: '#1976d2'
                            }
                            : {
                              display: "flex",
                              border: "1px solid #e0e0e0",
                              boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px",

                              // backgroundColor: "#FAFBFD",
                            }
                        }
                        onClick={() => handleClickSubForAction(sub)}
                      >
                        <span style={{ margin: "10px 0px 10px 20px" }}>
                          {sub.subMenuName}
                        </span>
                      </td>
                    ))}
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </Grid>
        <Grid item sm={8} md={8} sx={{ height: 'auto' }}>
          <Grid container spacing={{ xs: 3, md: 3 }} columns={{ xs: 2, sm: 8, md: 8, lg: 8 }} >
            <Grid item xs={2} sm={8} md={8} lg={4}>
              <Typography variant='h6' sx={{ margin: '20px 0', color: 'primary.main' }}>Action</Typography>
              <div sx={{ maxHeight: "58vh", height: "58vh" }}>
                <table style={{ width: "100%", maxWidth: "100%" }}>
                  {MenuList.find((x) => x.menuNo === MenuNo)
                    ?.subMenu.filter((sub) => sub.subMenuNo === SubMenuNo)[0]
                    ?.action?.map((Data, index) => (

                      // ActionList.map((Data, index) => (
                      <tbody>
                        <tr>
                          <td
                            className="table-list-group-item-action"
                            key={Data.actionNo}
                            style={
                              Data.actionNo === ActionNo
                                ? {
                                  display: "flex",
                                  border: "1px solid #e0e0e0",
                                  flexWrap: "wrap",
                                  backgroundColor: "#1976d2",
                                  boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px",
                                  color: '#fff'
                                }
                                : {
                                  display: "flex",
                                  border: "1px solid #e0e0e0",
                                  boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px",
                                  flexWrap: "wrap",
                                }
                            }
                            onClick={() => setActionNo(Data.actionNo)}
                          >
                            <span
                              style={{
                                margin: "10px 0px 10px 20px",
                              }}
                            >

                              {Data.actionName}
                            </span>
                            {/* <div
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
                                  onClick={() => handleEditAndAddAction(Data)}
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
                                  onClick={() => handleCancelAction(Data)}
                                >
                                  close
                                </span>
                              </button>
                            </div> */}
                          </td>
                        </tr>
                      </tbody>
                    ))}
                </table>
              </div>
            </Grid>
            <Grid item xs={2} sm={8} md={8} lg={4}>
              <Typography variant='h6' sx={{ margin: '20px 0', color: 'primary.main' }}>Role</Typography>
              <div sx={{ maxHeight: "58vh", height: "58vh" }}>
                <table style={{ width: "100%", maxWidth: "100%" }}>
                  {ActionNo &&
                    RoleList.map((Data, index) => (
                      <tbody>
                        <tr>
                          <td
                            key={index}
                            style={{
                              display: "flex",
                              border: "1px solid #e0e0e0",
                              flexWrap: "wrap",
                            }}
                          // onClick={() => setActionNo(Data.actionNo)}
                          >
                            <Checkbox
                              size="small"
                              sx={{
                                color: 'primary',
                                "&.Mui-checked": {
                                  color: 'primary',
                                },
                              }}
                              id={"Role" + index}
                              name={"Role" + index}
                              onChange={(e) =>
                                handleCheckBox(Data, index, e.target.checked)
                              }
                              checked={Data?.selected || false}
                            />
                            <span
                              style={{
                                margin: "10px 0px 10px 20px",
                              }}
                            >
                              {Data.roleName}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    ))}
                </table>
              </div>
              <Button
                variant="contained"
                size="large"
                color="primary"
                style={{
                  fontSize: '24px',
                  color: "white",
                  width: '100%',
                  textTransform: "lowercase",
                }}
                onClick={() => saveRole()}
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

        </Grid>

      </Grid>
      {/* <DialogForAPI
            DialogOpen={open}
            DialogClose={handleCloseDialog}
            message={message}
          /> */}
    </Box>
  );
}



// <Dialog
// open={OpenEdit}
// onClose={() => handleClose()}
// fullWidth={true}
// maxWidth="xs"
// classes={{ paper: classes.dialogPaper }}
// >
// <DialogContent>
//   <TextField
//     sx={{ width: "100%" }}
//     size="small"
//     onChange={(e) => setName(e.target.value)}
//     value={Name}
//     required
//     // error={ExcelNameErr}
//     label="ชื่อ"
//   />
// </DialogContent>
// <DialogActions
//   style={{
//     display: "flex",
//     justifyContent: "center",
//     marginBottom: 20,
//   }}
// >
//   <Button
//     variant="contained"
//     style={{
//       color: "black",
//       borderColor: "transparent",
//       backgroundColor: "#F8F9FA",
//       padding: 10,
//       marginRight: 10,
//       width: 80,
//     }}
//     onClick={() => handleClose()}
//   >
//     ยกเลิก
//   </Button>

//   <Button
//     variant="contained"
//     style={{
//       color: "white",
//       backgroundColor: "#FF0000",
//       borderColor: "transparent",
//       padding: 10,
//       marginRight: 10,
//       width: 80,
//     }}
//     onClick={() => handleSaveEditAction()}
//   >
//     {Loading ? (
//       <CircularProgress
//         sx={{
//           color: "#FFFFFF",
//         }}
//         size={24}
//       />
//     ) : (
//       "ตกลง"
//     )}
//   </Button>
// </DialogActions>
// </Dialog>

// <Dialog
// open={openCancel}
// onClose={() => handleClose()}
// fullWidth={true}
// maxWidth="xs"
// classes={{ paper: classes.dialogPaper }}
// >
// <DialogTitle>ยืนยันที่จะลบหรือไม่</DialogTitle>
// <DialogActions
//   style={{
//     display: "flex",
//     justifyContent: "center",
//     marginBottom: 20,
//   }}
// >
//   <Button
//     variant="contained"
//     style={{
//       color: "black",
//       borderColor: "transparent",
//       backgroundColor: "#F8F9FA",
//       padding: 10,
//       marginRight: 10,
//       width: 80,
//     }}
//     onClick={() => handleClose()}
//   >
//     ยกเลิก
//   </Button>
//   <Button
//     variant="contained"
//     style={{
//       color: "white",
//       backgroundColor: "#FF0000",
//       borderColor: "transparent",
//       padding: 10,
//       marginRight: 10,
//       width: 80,
//     }}
//     onClick={() => EditAndAddAction("del")}
//   >
//     {Loading ? (
//       <CircularProgress
//         sx={{
//           color: "#FFFFFF",
//         }}
//         size={24}
//       />
//     ) : (
//       "ตกลง"
//     )}
//   </Button>
// </DialogActions>
// </Dialog>

