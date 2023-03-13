import React, { useState, useEffect } from "react";
import {
  Paper,
  Button,
  Dialog,
  DialogContent,
  TextField,
  DialogActions,
  Grid,
  DialogTitle,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";
// import { makeStyles } from "@mui/styles";
import api from "../../../components/api/api";
import qs from "qs";
import DialogForAPI from "../../../components/DialogForAPI";
import FileUploadService from "../../../Services/FileUploadService";
import styled from "@emotion/styled";
// import { styled } from "@mui/material/styles";
// import "../css/styles.css";

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
export default function ManagePermissions() {
  const classes = useStyles();

  const [MenuList, setMenuList] = useState([]);
  const [SubMenuNo, setSubMenuNo] = useState("");
  const [MenuNo, setMenuNo] = useState("");
  const [ActionList, setActionList] = useState([]);
  const [Name, setName] = useState("");
  const [OpenEdit, setOpenEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const [Status, setStatus] = useState(true);
  const [message, setmessage] = useState("");
  const [openCancel, setOpenCancel] = useState(false);
  const [ActionNo, setActionNo] = useState("");
  const [Loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [openUp, setOpenUp] = useState(false);
  const [Num, setNum] = useState(null);

  const Input = styled("input")({
    display: "none",
  });

  const fetchMenuAll = async () => {
    try {
      const result = await api.get("api/v1.0/setting/menu/list");
      const _result = result.data.result;
      setMenuList(_result);
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

  const EditAndAddMenu = async (add) => {
    setLoading(true);
    const body = { menuNo: add === 1 ? "" : MenuNo, menuName: Name, status: Status };

    // console.log(body);
    try {
      await api.post("api/v1.0/setting/menu/create", body).then((res) => {
        if (res) {
          setOpen(true);
          setmessage(res.data.message);
          setTimeout(() => {
            handleClose();
            setOpen(false);
          }, 2000);
          fetchMenuAll();
        }
      });
    } catch (error) {
      console.log("error => ", error);
      setLoading(false);
    }
  };

  const EditAndAddSubMenu = async (add) => {
    setLoading(true);

    const body = {
      subMenuNo: add === 1 ? null : SubMenuNo,
      menuNo: MenuNo,
      subMenuName: Name,
      status: Status,
    };

    try {
      await api.post("api/v1.0/setting/submenu/create", body).then((res) => {
        if (res) {
          setOpen(true);
          setmessage(res.data.message);
          setTimeout(() => {
            handleClose();
            setOpen(false);
          }, 2000);
          // alert('สร้างเรียบร้อย')

          fetchMenuAll();
        }
      });
    } catch (error) {
      console.log("error => ", error);
      setLoading(false);
    }
  };

  const EditAndAddAction = async (add) => {
    setLoading(true);

    const body = {
      menuNo: MenuNo,
      subMenuNo: SubMenuNo,
      actionNo: add === 1 ? null : ActionNo,
      actionName: Name,
      status: Status,
    };

    try {
      const result = await api
        .post("api/v1.0/setting/action/create", body)
        .then((res) => {
          if (res) {
            setOpen(true);
            setmessage(res.data.message);
            setTimeout(() => {
              handleClose();
              setOpen(false);
            }, 2000);
            // alert('อัปเดตเรียบร้อย')

            fetchActionMenu();
          }
        });
      console.log(result);
    } catch (error) {
      console.log("error => ", error);
      setLoading(false);
    }
  };

  const Download = async () => {
    try {
      const result = await api({
        url: "api/v1.0/setting/menu/download",
        method: "GET",
        responseType: "blob",
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "Menu_Excel.xlsx");
        document.body.appendChild(link);
        link.click();
      });
    } catch (error) {
      console.log("error => ", error);
    }
  };

  const Upload = async () => {
    setLoading(true);

    try {
      const result = await FileUploadService.uploadExcelCatagoly(files).then(
        (res) => {
          if (res) {
            setOpen(true);
            setmessage(res.data.message);
            setTimeout(() => {
              handleClose();
              setOpen(false);
            }, 2000);
            fetchActionMenu();
          }
        }
      );
      console.log(result);
    } catch (error) {
      console.log("Could not upload the file!", error);
      setFiles([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuAll();
    if (MenuNo || SubMenuNo) {
      fetchActionMenu();
    }
  }, [SubMenuNo]);

  const handleClose = () => {
    setLoading(false);

    setOpen(false);
    setOpenEdit(false);
    setOpenCancel(false);
    setName("");
    setMenuNo("");
    setSubMenuNo("");
    setStatus(true);
    setFiles([]);
    setOpenUp(false);
    setNum(null);
  };

  const handleCloseDialog = (props) => {
    setOpen(props);
  };

  const handleOpenEditMenu = (Data, add) => {
    if (add === 1) {
      setOpenEdit(true);
      setMenuNo(Data.menuNo);
      setSubMenuNo(null);
      setNum(3);
    } else {
      setName(Data.menuName);
      setOpenEdit(true);
      setMenuNo(Data.menuNo);
      setNum(1);
    }
  };

  const handleOpenEditSubMenu = (Data) => {
    setName(Data.subMenuName);
    setSubMenuNo(Data.subMenuNo);
    setMenuNo(Data.menuNo);
    setNum(4);
    setOpenEdit(true);
  };

  const handleSaveEdit = () => {
    const selectedMenu = MenuList.filter((x) => x.menuNo === MenuNo);

    selectedMenu.forEach((x) => {
      x.menuName = Name;
    });

    setMenuList([...MenuList]);

    EditAndAddMenu();
  };

  const handleSaveEditSub = () => {
    const selectedSubMenu = MenuList.find(
      (x) => x.menuNo === MenuNo
    )?.subMenu.filter((x) => x.subMenuNo === SubMenuNo);

    selectedSubMenu.forEach((x) => {
      x.subMenuName = Name;
    });

    setMenuList([...MenuList]);

    EditAndAddSubMenu();
  };

  const handleSaveEditAction = () => {
    const selectedAction = ActionList.filter((x) => x.actionNo === ActionNo);

    selectedAction.forEach((x) => {
      x.actionName = Name;
    });

    setActionList([...ActionList]);

    EditAndAddAction();
  };

  const handleCancelMenu = (MenuSelect) => {
    setName(MenuSelect.menuName);
    setMenuNo(MenuSelect.menuNo);
    setStatus("N");
    setNum(2);

    setOpenCancel(true);
  };

  const handleCancelSubMenu = (SubSelect) => {
    // const selectedSubMenu = MenuList.find(
    //   (x) => x.menuNo === SubSelect.menuNo
    // )?.subMenu.filter((x) => x.subMenuNo === SubSelect.subMenuNo);

    // selectedSubMenu.forEach((x) => {
    //   x.status = "N";
    // });

    // setMenuList([...MenuList]);

    setName(SubSelect.subMenuName);
    setSubMenuNo(SubSelect.subMenuNo);
    setMenuNo(SubSelect.menuNo);
    setStatus(false);
    setNum(5);

    setOpenCancel(true);
  };

  const handleCancelAction = (ActionSelect) => {
    setMenuNo(ActionSelect.menuNo);
    setSubMenuNo(ActionSelect.subMenuNo);
    setActionNo(ActionSelect.actionNo);
    setStatus(false);
    setNum(8);

    setOpenCancel(true);
  };

  const handleSaveAddMenu = () => {
    setMenuNo(null);
    setOpenEdit(true);
    setNum(0);
  };

  const handleEditAndAddAction = (Data, add) => {
    if (add === 1) {
      setMenuNo(Data.menuNo);
      setSubMenuNo(Data.subMenuNo);
      setActionNo(null);
      setOpenEdit(true);
      setNum(6);
    } else {
      setMenuNo(Data.menuNo);
      setSubMenuNo(Data.subMenuNo);
      setName(Data.actionName);
      setActionNo(Data.actionNo);
      setNum(7);
      setOpenEdit(true);
    }
  };

  const handleFileUpload = (event) => {
    let currentFiles = event.target.files[0];

    setFile(currentFiles);

    event.target.value = null;
  };

  const setFile = (file) => {
    setFiles([...files, file]);
    setOpenUp(true);
  };

  const handleClickSubForAction = (Data) => {
    setSubMenuNo(Data.subMenuNo);
    setMenuNo(Data.menuNo);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant='h4' sx={{ color: '#000' }}>เเอคชั่นทั้งหมด</Typography>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 8, md: 12 }}>
        <Grid item xs={2} sm={8} md={4}>
          <Typography variant='h6' sx={{ margin: '20px 0', color: 'primary.main' }}>Category</Typography>
          <div sx={{ maxHeight: "58vh", height: "58vh" }}>
            <table style={{ width: "100%", maxWidth: "100%" }}>
              {MenuList.map((Data, index) => (
                <tr key={Data.roleId}>
                  <td
                    className="table-list-group-item-action"
                    style={{
                      display: "flex",
                      // border: "1px solid #e0e0e0",
                      fontWeight: 'bold',
                      fontSize: "20px",
                      flexWrap: "wrap",
                    }}
                    onClick={() => setMenuNo(Data.menuNo)}
                  >
                    <span
                      style={{
                        margin: "10px 0px 10px 20px",
                      }}
                    >
                      {Data.menuName}
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
                          onClick={() => handleOpenEditMenu(Data)}
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
                          style={{
                            color: "#2DCE98",
                          }}
                          onClick={() => handleOpenEditMenu(Data, 1)}
                        >
                          add
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
                          onClick={() => handleCancelMenu(Data)}
                        >
                          close
                        </span>
                      </button>
                    </div>
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
                            border: "1px solid #e0e0e0",
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
                            onClick={() => handleOpenEditSubMenu(sub)}
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
                            style={{
                              color: "#2DCE98",
                            }}
                            onClick={() => handleEditAndAddAction(sub, 1)}
                          >
                            add
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
                            onClick={() => handleCancelSubMenu(sub)}
                          >
                            close
                          </span>
                        </button>
                      </div>
                    </td>
                  ))}
                </tr>
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
                    ?.subMenu?.filter((sub) => sub.subMenuNo === SubMenuNo)[0]
                    ?.action?.map((Data, index) => (
                      // ActionList.map((Data, index) => (
                      <tr key={Data.roleId}>
                        <td
                          style={{
                            display: "flex",
                            border: "1px solid #e0e0e0",
                            flexWrap: "wrap",
                          }}
                          onClick={() => setActionNo(Data.actionNo)}
                        >
                          <span
                            style={{
                              margin: "10px 0px 10px 20px",
                            }}
                          >
                            {Data.actionName}__{Data.actionNo}
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
                          </div>
                        </td>
                      </tr>
                    ))}
                </table>
              </div>
            </Grid>
            <Grid item xs={2} sm={8} md={8} lg={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Button
                variant="contained"
                size="large"
                style={{
                  color: "#1976d2",
                  backgroundColor: "white",
                  borderColor: "#1976d2",
                  width: 120,
                  textTransform: "lowercase",
                }}
                onClick={() => handleSaveAddMenu()}
              >
                Add
              </Button>
              <Button
                variant="contained"
                size="large"
                style={{
                  color: "#1976d2",
                  backgroundColor: "white",
                  marginLeft: 10,
                  borderColor: "#1976d2",
                  width: 120,
                  textTransform: "lowercase",
                }}
                onClick={() => Download()}
              >
                Download
              </Button>
              <label htmlFor="contained-button-file">
                <Input
                  accept="xlsx/*"
                  id="contained-button-file"
                  multiple
                  type="file"
                  onChange={handleFileUpload}
                />
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
                  component="span"
                >
                  Upload
                </Button>
              </label>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Dialog
        open={OpenEdit}
        onClose={() => handleClose()}
        fullWidth={true}
        maxWidth="xs"
        classes={{ paper: classes.dialogPaper }}
      >
        <DialogContent>
          <TextField
            sx={{ width: "100%" }}
            size="small"
            onChange={(e) => setName(e.target.value)}
            value={Name}
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
            onClick={() => handleClose()}
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
            onClick={
              Num === 0
                ? () => EditAndAddMenu(1)
                : Num === 1
                  ? () => handleSaveEdit()
                  : Num === 3
                    ? () => EditAndAddSubMenu(1)
                    : Num === 4
                      ? () => handleSaveEditSub()
                      : Num === 6
                        ? () => EditAndAddAction(1)
                        : Num === 7
                          ? () => handleSaveEditAction()
                          : null
            }
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
        onClose={() => handleClose()}
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
            onClick={() => handleClose()}
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
            onClick={
              Num === 2
                ? () => EditAndAddMenu()
                : Num === 5
                  ? () => EditAndAddSubMenu()
                  : Num === 8
                    ? () => EditAndAddAction()
                    : null
            }
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
        open={openUp}
        onClose={handleClose}
        fullWidth={true}
        maxWidth="xs"
      >
        <DialogContent>
          {/* <p>{messageErr}</p> */}
          {files?.map((x, index) => {
            return (
              <p>
                {index + 1 + "." + " "}
                {x.name}
              </p>
            );
          })}
        </DialogContent>
        <DialogActions
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 20,
            marginTop: 20,
          }}
        >
          <Button
            variant="contained"
            style={{
              color: "black",
              borderColor: "transparent",
              backgroundColor: "#F8F9FA",
              width: 80,
            }}
            onClick={handleClose}
          >
            ปิด
          </Button>

          <Button
            variant="contained"
            style={{
              color: "white",
              backgroundColor: "#FF0000",
              borderColor: "transparent",
              marginRight: 10,
              width: 80,
            }}
            onClick={() => Upload()}
          >
            {Loading ? (
              <CircularProgress
                sx={{
                  color: "white",
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
