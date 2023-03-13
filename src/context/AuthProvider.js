// import axios from "axios";
import { createContext } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
// import configData from '/resources/config.json'
import api from '../components/api/api'
import envInstants from "../libs/configs/env";
const AuthContext = createContext({})
// let api_url = process.env.REACT_APP_BASE_API
// let api_url = window.REACT_APP_BASE_API || process.env.REACT_APP_BASE_API

// const instance = axios.create({
//     baseURL: process.env.REACT_APP_BASE_API,
// });
// instance.interceptors.response.use(
//     (response) =>
//         new Promise((resolve, reject) => {
//             resolve(response);
//         }),
// );
// console.log(api);
export const AuthProvider = ({ children }) => {
    const location = useLocation()



    const from = location.state?.from?.pathname || '/'
    const navigate = useNavigate()

    // const [auth, setAuth] = useState({})

    // const [authToken, setAuthToken] = useState({})
    // const [user, setUser] = useState(null)
    // console.log(authToken)
    // const loginUser = async (value, setErrors) => {

    //     await axios.post(`${api_url}api/v1.0/auth/login`, value, {
    //         headers: { 'Content-Type': 'application/json' }
    //     }).then((response) => response.data)
    //         .then((data) => {
    //             if (data.status === true) {
    //                 console.log('login succes')
    //                 const { accessToken } = data.result
    //                 // setAuthToken({ accessToken, refreshToken} )
    //                 // localStorage.setItem('authToken', JSON.stringify({ accessToken, refreshToken }))
    //                 localStorage.setItem('accessToken', accessToken)
    //                 navigate(from, { replace: true })

    //             } else {
    //                 setErrors(data.code)

    //                 console.log('login failed')
    //             }
    //         });
    // }
    //-------------------------API Profile--------------------------

    // const getUser = async (setUser, setIsLoading) => {

    //     try {
    //         await axios.get(`${api_url}api/v1.0/auth/profile`)
    //             .then((response) => response.data)
    //             .then((data) => {
    //                 if (data.status === true) {
    //                     console.log(data.result)
    //                     setUser(data.result)
    //                     // localStorage.setItem('name', accessToken)
    //                 } else {
    //                     console.log(' failed')
    //                 }
    //             });
    //         setIsLoading(false)

    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    //-------------------------API List User--------------------------

    const userList = (setUsers) => {

        api.get(`api/v1.0/users/list`, {
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => {
            setUsers(response.data.result);
        });
    }

    //-------------------------API Check User--------------------------

    const checkUser = (userID, setUser, setIsLoading2) => {
        api.get(`api/v1.0/users/getuserbyid/${userID}`).then((response) => response.data)
            .then((data) => {
                if (data.status === true) {
                    // console.log('login succes')
                    setUser(data.result)
                    // setIsLoading2(false)
                } else {
                    console.log(' failed')
                }
            });
    }

    //-------------------------API Update User--------------------------

    const updateUser = (value, users_sites_create, userSite
        , site) => {
        api.put(`api/v1.0/users/update/${value.userId}`, value, {
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => response.data)
            .then((data) => {
                if (data.status === true) {
                    // console.log('succes')
                    // const configSiteUserID = userSite?.configSiteUserID
                    const userId = data.result.userID
                    const user_tk = localStorage.getItem('profile')
                    const user_id_tk = (JSON.parse(user_tk)?.profile)
                    const firstname = data.result.firstname
                    const role = data.result.roleID.roleName
                    const body = site.map((x) =>
                    ({
                      siteID: x.siteID,
                      configSiteUserID: userSite?.filter((y) => y.siteID === x.siteID).map((g) => g.configSiteUserID)[0] || "",
                      userId: userId,
                      status: value.siteID.filter((y) => y === x.siteID).length > 0 ? true : false
                      // userSite.filter(x => !Usersiteselet.includes(x.siteID)).map((y) => y.siteID)
                    }))
                    // const body = [userSite]
                    users_sites_create(body)                    
                    alert('Update Success')

                    navigate('/Settings/User')
                    if (userId === user_id_tk.userId) {
                        localStorage.removeItem('profile')
                        localStorage.setItem("profile", JSON.stringify({ profile: { firstname, role, userId } }))
                    }

                } else {
                    console.log(' failed')
                }
            });
    }

    //-------------------------API Create User--------------------------

    const createUser = (value, users_sites_create) => {
        api.post(`api/v1.0/users/create/`, value, {
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => response.data)
            .then((data) => {
                if (data.status === true) {
                    // console.log('succes')
                    const userId = data.result.userID
                    const body = value.siteID.map((x) => ({
                      siteID: x,
                      configSiteUserID: "",
                      userId: userId,
                      status: value.status
                      // userSite.filter(x => !Usersiteselet.includes(x.siteID)).map((y) => y.siteID)
                    }))
                    // console.log(body)
                    users_sites_create(body)                    
                    alert('Create Success')
                    navigate('/Settings/User')
                } else {
                    console.log('failed')
                }
            });
    }

    //-------------------------API SITE--------------------------

    const siteList = (setSite) => {

        api.get(`api/v1.0/site`, {
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => {
            setSite(response.data.result);
            // setIsLoading(false)
        });
    }

    //-------------------------API Check SITE--------------------------

    const checksite = (siteID, setSite, setIsLoading, setSiteName, setStatussite) => {
        api.put(`api/v1.0/site/detail/${siteID}`).then((response) => response.data)
            .then((data) => {
                if (data.status === true) {
                    setSite(data.result)
                    setSiteName(data.result.siteName)
                    //setStatussite(data.result.status)
                    setIsLoading(false)
                } else {
                    console.log(' failed')
                }
            });
    }

    //-------------------------API Update SITE--------------------------

    const updateSite = (value) => {
        api.put(`api/v1.0/site/update/${value.siteId}`, value, {
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => response.data)
            .then((data) => {
                if (data.status === true) {
                    //console.log('succes')
                    alert('Update Success')
                    navigate('/Settings/Site')
                } else {
                    console.log('failed')
                }
            });
    }

    //-------------------------API Update Amount--------------------------

    const updateAmount = (data) => {
        api.post(`api/v1.0/confirm/update`, data, {
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => response.data)
            .then((data) => {
                if (data.status === true) {
                    // console.log('succes')
                    navigate('/Settings/Site')
                } else {
                    console.log('failed')
                }
            });
    }

    //-------------------------API Bank DD--------------------------

    const bank_ddl = (setBank_D, setIsLoading1) => {
        api.get(`api/v1.0/bankaccount/bank-ddl`)
            .then((response) => response.data)
            .then((data) => {
                if (data.status === true) {
                    setBank_D(data)
                    setIsLoading1(false)
                    // console.log('succes')
                } else {
                    console.log('failed')
                }
            });
    }

    //-------------------------API Site DD--------------------------

    const site_ddl = (setSite_D, setIsLoading2) => {
        api.get(`api/v1.0/bankaccount/site-ddl`)
            .then((response) => response.data)
            .then((data) => {
                if (data.status === true) {
                    setSite_D(data)
                    setIsLoading2(false)
                    // console.log('succes')
                } else {
                    console.log('failed')
                }
            });
    }

    //-------------------------API Customer DD--------------------------

    const customer_ddl = (setCustomer_D, setIsLoading3) => {
        api.get(`api/v1.0/bankaccount/customer-ddl`)
            .then((response) => response.data)
            .then((data) => {
                if (data.status === true) {
                    setCustomer_D(data)
                    setIsLoading3(false)
                    // console.log('succes')
                } else {
                    console.log('failed')
                }
            });
    }

    //-------------------------API Bank Account--------------------------

    const bankaccount = (setAccounts, setIsLoading) => {
        api.get(`api/v1.0/bankaccount`)
            .then((response) => response.data)
            .then((data) => {
                if (data.status === true) {
                    // console.log('succes')
                    setAccounts(data)
                    setIsLoading(false)

                } else {
                    console.log('failed')
                }
            });
    }

    //-------------------------API Create Bank Account--------------------------

    const create_bankaccount = (value) => {
        api.post(`api/v1.0/bankaccount/create`, value).then((response) => response.data)
            .then((data) => {
                if (data.status === true) {
                    alert('Create Success')
                    // console.log('succes')
                    navigate('/Settings/AccountInfo')
                } else {
                    console.log('failed')
                }
            });
    }

    //-------------------------API DepositMoney--------------------------

    const DepoListMoney = (setDepositMoney, setsearchApikData) => {

        api.get(`api/v1.0/deposit`, {
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => {
            setDepositMoney(response.data.result);
            //setsearchApikData(response.data.result);
        });
    }

    /* const MoneyDetail = ( tscba_tscBankAccountID, setMoneyDetail, setIsLoading) => {

        axios.get(`${api_url}api/v1.0/deposit/detail/${tscba_tscBankAccountID}`, {
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => response.data)
        .then((data) => {
            if (data.status === true) {
                console.log('succes')
                setMoneyDetail(data.result[0])
                setIsLoading(false)

            } else {
                console.log('failed')
            }
        });
    } */

    //-------------------------API DepositCrypto--------------------------

    const DepoListCrypto = (setDepositCrypto) => {

        api.get(`api/v1.0/deposit/crypto`, {
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => {
            setDepositCrypto(response.data.result);
        });
    }

    //-------------------------API DepoListUnknown--------------------------

    const DepoListUnknown = (setDepoListUnknown) => {

        api.get(`api/v1.0/deposit/manual`, {
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => {
            setDepoListUnknown(response.data.result);
        });
    }

    //-------------------------API DepositBonus--------------------------

    const DepoListBonus = (setDepositBonus) => {

        api.get(`api/v1.0/deposit/bonus`, {
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => {
            setDepositBonus(response.data.result);
        });
    }


    //-------------------------API Bank Account Detail--------------------------

    const bankaccount_detail = (mba_bankAccID, setDetailAccount, setIsLoading4) => {
        api.put(`api/v1.0/bankaccount/detail/${mba_bankAccID}`).then((response) => response.data)
            .then((data) => {
                if (data.status === true) {
                    // console.log(data.result)
                    setDetailAccount(data.result[0])
                    setIsLoading4(false)
                } else {
                    console.log(' failed')
                }
            });
    }

    //-------------------------API Bank Account Update--------------------------

    const bankaccount_update = (value) => {
        api.put(`api/v1.0/bankaccount/update/${value.bankAccID}`, value).then((response) => response.data)
            .then((data) => {
                if (data.status === true) {
                    alert('Update Success')
                    navigate('/Settings/AccountInfo')

                } else {
                    console.log(' failed')
                }
            });
    }
    const users_sites_create = (body) => {
        // console.log(body)
        // api.post(`api/v1.0/users/sites/create`, value.siteID.map((item) => { return { "configSiteUserID": configSiteUserID, "siteID": item, "userID": userId, "status": value.status } })).then((response) => response.data)
        api.post(`api/v1.0/users/sites/create`, body.map((item) => {return { "configSiteUserID": item.configSiteUserID, "siteID": item.siteID, "userID": item.userId, "status": item.status }})).then((response) => response.data)
            .then((data) => {
                if (data.status === true) {
                    // console.log('users_sites_create_succes')
                    // console.log(data)
                    // alert('Create Success')

                } else {
                    console.log(' failed')
                }
            });
    }
    const get_users_sites = (userId, setUserSite, setIsLoadingUserSite) => {
        api.get(`api/v1.0/users/sites/getuserbyid/${userId}`).then((response) => response.data)
            .then((data) => {
                if (data.status === true) {
                    // console.log('users_sites_create_succes')
                    // console.log(data)
                    setUserSite(data.result)
                    setIsLoadingUserSite(false)

                } else {
                    console.log(' failed')
                }
            });
    }
    const get_sites_token = (setSite) => {
        api.get(`api/v1.0/users/sites/getuserbytoken`).then((response) => response.data)
            .then((data) => {
                if (data.status === true) {
                    // // console.log('users_sites_create_succes')
                    // // console.log(data)
                    setSite(data.result)
                    // setIsLoadingUserSite(false)

                } else {
                    console.log(' failed')
                }
            });
    }
    const get_dashboard_top = (siteID, startDate, endDate, setDashboardSum) => {
        api.get(`api/v1.0/dashboard/top?siteID=${siteID}&startdate=${startDate}&enddate=${endDate}`).then((response) => response.data)
            .then((data) => {
                if (data.status === true) {
                    // // console.log('users_sites_create_succes')
                    // // console.log(data)
                    setDashboardSum(data.result)
                    // setIsLoadingUserSite(false)

                } else {
                    console.log(' failed')
                }
            });
    }

    const GetuserBytoken = (setGetuserBytoken) => {

        api.get(`api/v1.0/users/sites/getuserbytoken`, {
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => {
            setGetuserBytoken(response.data.result);
        });
    }
    const Thisyear = (set, setThisyear, startDate, endDate) => {
        api.get(`api/v1.0/dashboard/bottom/thisyear?siteID=${set}&startdate=${startDate}&enddate=${endDate}`).then((response) => response.data)
            .then((data) => {
                if (data.status === true) {
                    // // console.log('users_sites_create_succes')
                    // // console.log(data)
                    setThisyear(data.result)
                    // setIsLoadingUserSite(false)

                } else {
                    console.log(' failed')
                }
            });
    }
    const Thisweek = (set, setThisWeek, startDate, endDate) => {
        api.get(`api/v1.0/dashboard/bottom/thisweek?siteID=${set}&startdate=${startDate}&enddate=${endDate}`).then((response) => response.data)
            .then((data) => {
                if (data.status === true) {
                    // // console.log('users_sites_create_succes')
                    // // console.log(data)
                    setThisWeek(data.result)
                    // setIsLoadingUserSite(false)

                } else {
                    console.log(' failed')
                }
            });
    }
    const AllTimes = (set, setAlltime) => {
        api.get(`api/v1.0/dashboard/bottom/alltime?siteID=${set}`).then((response) => response.data)
            .then((data) => {
                if (data.status === true) {
                    // // console.log('users_sites_create_succes')
                    // // console.log(data)
                    setAlltime(data.result)
                    // setIsLoadingUserSite(false)

                } else {
                    console.log(' failed')
                }
            });
    }

    const getRole  = (setRole) => {
        api.get(`api/v1.0/setting/role/list`).then((response) => response.data)
        .then((data) => {
            if (data.status === true) {
                // // console.log('users_sites_create_succes')
                setRole(data.result)
                // setIsLoadingUserSite(false)
                // console.log(data)


            } else {
                console.log(' failed')
            }
        });
    }
    const getMenu = (setMenus) => {
        api.get(`api/v1.0/setting/menu/list`).then((response) => response.data)
        .then((data) => {
            if (data.status === true) {
                // // console.log('users_sites_create_succes')
                // console.log(data)
                setMenus(data.result)
                // setIsLoadingUserSite(false)

            } else {
                console.log(' failed')
            }
        });
    }
    const getConfigactionList = (setConfigactionList) => {
        api.get(`api/v1.0/setting/configaction/list`).then((response) => response.data)
        .then((data) => {
            if (data.status === true) {
                // // console.log('users_sites_create_succes')
                // console.log(data)
                setConfigactionList(data.result)
                // setIsLoadingUserSite(false)

            } else {
                console.log(' failed')
            }
        });
    }
    const CreateConfigactionList = (value) => {
        api.post(`api/v1.0/setting/configaction/create`,value.roleID.map((item) => { return { "configSiteUserID": value.configSiteUserID, "roleID": item, "actionNo": value.actionNo, "status": value.status } })).then((response) => response.data)
        .then((data) => {
            if (data.status === true) {
                // // console.log('users_sites_create_succes')
                // console.log(data)
                alert('Update Success')
                window.location.href = '/Settings/Permissions'

                // setConfigactionList(data.result)
                // setIsLoadingUserSite(false)

            } else {
                console.log(' failed')
            }
        });
    }

    // const resetPassword = (password, userID) => {
    //     api.put(`/api/v1.0/users/resetpassword/`,).then((response) => response.data)
    //     .then((data) => {
    //         if (data.status === true) {
    //             // // console.log('users_sites_create_succes')
    //             // console.log(data)
    //             // setIsLoadingUserSite(false)
    //             alert('reset password succes')

    //         } else {
    //             console.log(' failed')
    //         }
    //     });
    // }
    

    

    const getReportBankacc = (setReportBankacc,data) => {
        api.get(`api/v1.0/report/bankacc/balance?siteID=${data.siteID}&bankType=${data.bankType}&bankAccNo=${data.bankAccNo}`).then((response) => response.data)
        .then((data) => {
            if (data.status === true) {
                // // console.log('users_sites_create_succes')
                // console.log(data)
                setReportBankacc(data.result)
                // setIsLoadingUserSite(false)

            } else {
                console.log(' failed')
            }
        });
    }
    // const getReportBankaccFile = () => {
    //     api.get(`api/v1.0/report/bankacc/balance/file`).then((response) => response.data)
    //     .then((data) => {
    //         if (data.status === true) {
    //             // // console.log('users_sites_create_succes')
    //             // console.log(data)
    //             // setConfigactionList(data.result)
    //             // setIsLoadingUserSite(false)

    //         } else {
    //             console.log(' failed')
    //         }
    //     });
    // }
    const getReportWalletBankacc = (setReportWalletBankacc, data) => {
        api.get(`api/v1.0/report/wallet/balance?siteID=${data.siteID}&walletName=${data.bankAccNo}`).then((response) => response.data)
        .then((data) => {
            if (data.status === true) {
                // // console.log('users_sites_create_succes')
                // console.log(data)
                setReportWalletBankacc(data.result)
                // setIsLoadingUserSite(false)

            } else {
                console.log(' failed')
            }
        });
    }
    // const getReportWalletBankaccFile = () => {
    //     api.get(`api/v1.0/report/wallet/balance/file`).then((response) => response.data)
    //     .then((data) => {
    //         if (data.status === true) {
    //             // // console.log('users_sites_create_succes')
    //             // console.log(data)
    //             // setConfigactionList(data.result)
    //             // setIsLoadingUserSite(false)

    //         } else {
    //             console.log(' failed')
    //         }
    //     });
    // }
    const getReportBankaccMovement = (setReportBankaccMovement, data) => {
        api.get(`api/v1.0/report/bankacc/movement?siteID=${data.siteID}&startdate=${data.startdate}&enddate=${data.enddate}&bankAccNo=${data.bankAccNo}`).then((response) => response.data)
        .then((data) => {
            if (data.status === true) {
                // // console.log('users_sites_create_succes')
                // console.log(data)
                setReportBankaccMovement(data.result)
                // setIsLoadingUserSite(false)

            } else {
                console.log(' failed')
            }
        });
    }
    const getReportWalletBankaccMovement = (setReportWalletBankaccMovement, data) => {
        api.get(`api/v1.0/report/wallet/movement?siteID=${data.siteID}&startdate=${data.startdate}&enddate=${data.enddate}&walletName=${data.bankAccNo}`).then((response) => response.data)
        .then((data) => {
            if (data.status === true) {
                // // console.log('users_sites_create_succes')
                // console.log(data)
                setReportWalletBankaccMovement(data.result)
                // setIsLoadingUserSite(false)

            } else {
                console.log(' failed')
            }
        });
    }

    const ReportBankaccFile = async (data) => {
        try {
          const result = await api({
            url: `api/v1.0/report/bankacc/balance/file?siteID=${data.siteID}&bankType=${data.bankType}&bankAccNo=${data.bankAccNo}`,
            method: "GET",
            responseType: "blob",
          }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
    
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "ReportBankacc_Excel.xlsx");
            document.body.appendChild(link);
            link.click();
          });
        } catch (error) {
          console.log("error => ", error);
        }
      };

    const ReportBankaccWalleFile = async (data) => {
        try {
          const result = await api({
            url: `api/v1.0/report/wallet/balance/file?siteID=${data.siteID}&walletName=${data.bankAccNo}`,
            method: "GET",
            responseType: "blob",
          }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
    
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "ReportWallet_Excel.xlsx");
            document.body.appendChild(link);
            link.click();
          });
        } catch (error) {
          console.log("error => ", error);
        }
      };
    const ReportBankaccMovementFile = async (data) => {
        try {
          const result = await api({
            url: `api/v1.0/report/bankacc/movement/file?siteID=${data.siteID}&startdate=${data.startdate}&enddate=${data.enddate}&bankAccNo=${data.bankAccNo}`,
            method: "GET",
            responseType: "blob",
          }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
    
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "ReportBankaccMovement_Excel.xlsx");
            document.body.appendChild(link);
            link.click();
          });
        } catch (error) {
          console.log("error => ", error);
        }
      };

    const ReportBankaccWalleMovementFile = async (data) => {
        try {
          const result = await api({
            url: `api/v1.0/report/wallet/movement/file?siteID=${data.siteID}&startdate=${data.startdate}&enddate=${data.enddate}&walletName=${data.bankAccNo}`,
            method: "GET",
            responseType: "blob",
          }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
    
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "ReportWalletMovement_Excel.xlsx");
            document.body.appendChild(link);
            link.click();
          });
        } catch (error) {
          console.log("error => ", error);
        }
      };


      const getImg = async (bankID) => {
        const res = await api.get(`api/v1.0/bankaccount/bank-ddl/img/${bankID}`).then((response) => {return response.request.responseURL}
        // .data)
        // .then((data) => {
        //     console.log(data)
            // if (data.status === true) {
            //     console.log(data)
            // } else {
            //     console.log('failed')
            // }
        // }
        )
        return res
        
    }


    const contextData = {
        // loginUser: loginUser,
        userList: userList,
        // getUser: getUser,
        checkUser: checkUser,
        updateUser: updateUser,
        createUser: createUser,
        siteList: siteList,
        checksite: checksite,
        updateSite: updateSite,
        updateAmount: updateAmount,
        bank_ddl: bank_ddl,
        site_ddl: site_ddl,
        customer_ddl: customer_ddl,
        bankaccount: bankaccount,
        create_bankaccount: create_bankaccount,
        DepoListMoney: DepoListMoney,
        DepoListCrypto: DepoListCrypto,
        DepoListUnknown: DepoListUnknown,
        DepoListBonus: DepoListBonus,
        bankaccount_detail: bankaccount_detail,
        bankaccount_update: bankaccount_update,
        users_sites_create: users_sites_create,
        get_users_sites: get_users_sites,
        get_sites_token: get_sites_token,
        get_dashboard_top: get_dashboard_top,
        GetuserBytoken: GetuserBytoken,
        Thisyear: Thisyear,
        Thisweek: Thisweek,
        AllTimes: AllTimes,
        getRole: getRole,
        getMenu: getMenu,
        getConfigactionList: getConfigactionList,
        CreateConfigactionList: CreateConfigactionList,
        // resetPassword: resetPassword,
        getReportBankacc: getReportBankacc,
        ReportBankaccFile: ReportBankaccFile,
        getReportWalletBankacc: getReportWalletBankacc,
        ReportBankaccWalleFile: ReportBankaccWalleFile,
        getReportWalletBankaccMovement: getReportWalletBankaccMovement,
        getReportBankaccMovement: getReportBankaccMovement,
        ReportBankaccMovementFile:ReportBankaccMovementFile,
        ReportBankaccWalleMovementFile:ReportBankaccWalleMovementFile,
        getImg: getImg,


    }

   

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext