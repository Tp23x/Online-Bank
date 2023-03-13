import { ThemeProvider, CssBaseline, CircularProgress } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import theme from './theme';

import Dashboard from './views/Dashboard';

import DepositList from './views/DepositsList';
import ListMoney from './views/DepositsList/ListMoney';
import DepoListMoney from './views/DepositsList/ListMoney/DepoListMoney';
import ListUnknow from './views/DepositsList/ListUnknow';
import DepoListUnknow from './views/DepositsList/ListUnknow/DepoListUnknow';
import InformationDetail from './views/DepositsList/ListUnknow/InformationDetail';
import ListCrypto from './views/DepositsList/ListCrypto';
import DepoListCrypto from './views/DepositsList/ListCrypto/DepoListCrypto';
import ListBonus from './views/DepositsList/ListBonus';
import DepoListBobus from './views/DepositsList/ListBonus/DepoListBonus';

import WithdawList from './views/WithdrawList';
import WithdrawListMoney from './views/WithdrawList/WithdrawListMoney';
import WithdrawListCrypto from './views/WithdrawList/WithdrawListCrypto';
import WithdrawListMoneyDetail from './views/WithdrawList/WithdrawListMoney/WithdrawListMoneyDetail';
import WithdrawListCryptoDetail from './views/WithdrawList/WithdrawListCrypto/WithdrawListCryptoDetail';

import Report from './views/Report';

import Settings from './views/Settings';
import AccountInfo from './views/Settings/AccountInfo';
import AddAccount from './views/Settings/AccountInfo/AddAccount';
import User from './views/Settings/User';
import Site from './views/Settings/Site';
import SiteList from './views/Settings/Site/SiteList';
import AddSite from './views/Settings/Site/AddSite'
import UpdateSite from './views/Settings/Site/UpdateSite';
import UserDetail from './views/Settings/User/UserDetail';
import Approved from './views/Settings/Approved';
import RequireAuth from './components/RequireAuth';
import CreateUser from './views/Settings/User/CreateUser';
import DetailApprove from './views/Settings/Approved/DetailApprove';
import MoneyDetail from './views/DepositsList/ListMoney/MoneyDetail';
import { useDispatch, useSelector } from 'react-redux';
import { profileAsync } from './store/slices/profileSlice';
import DetailAccount from './views/Settings/AccountInfo/DetailAccount';

import envInstants from "./libs/configs/env";
// import httpClientInstants from "./libs/utils/HttpClient";
import { useEffect, useState } from 'react';
import api, { setInterceptors, setDefaultURL } from "./components/api/api";
import SetPermissions from './views/Settings/Permissions/SetPermissions';
import ManagePermissions from './views/Settings/Permissions/ManagePermissions';
import Role from './views/Settings/Permissions/Role';
import { getActions } from './store/slices/actionSlice';
import UnAction from './views/UnAction';
import UnAction1 from './views/UnAction1';
import { notiDepoAsync } from './store/slices/notiDepoSlice';
import { notiWitDAsync } from './store/slices/notiWitDSlice';
// import {setDefaultURL} from './context/AuthProvider'


function App() {
  const location = useLocation()
  // const { notiDepo } = useSelector(state => state.notiDepo)
  // const { notiWitD } = useSelector(state => state.notiWitD)
  // const { profile } = useSelector(state => state.profile)
  const local_token = localStorage.getItem("accessToken")
  // const { mutate: profile, isLoading, error } = useProfile()
  // console.log(user);

  
  // console.log(notiDepo, notiWitD)
  // const { profile } = useSelector(state => state.profile)
  // console.log(profile)

  const [isInitEnvError, setInitEnvError] = useState(false);
  const [isInitEnv, setInitEnv] = useState(false);
const dispatch = useDispatch()

  const { list: allActions } = useSelector((state) => state.action);
  useEffect(() => {
    const loadEnv = async () => {
      try {
        await envInstants.init();
        // httpClientInstants.setBaseUrl(envInstants.getConfig().baseUrl);
        setDefaultURL(envInstants.getConfig().baseUrl);
        // const userRes = await api.post("/api/users/user");
        // console.log(userRes);
        // const roleRes = await api.get(
        //   `/api/setting/actions/role?Role=${userRes.data.results.roleId}`
        // );

        // console.log(envInstants.getConfig().baseUrl);
        dispatch(profileAsync())
        dispatch(getActions());
        dispatch(notiDepoAsync());
        dispatch(notiWitDAsync());
        setInterval(() => {
          dispatch(notiDepoAsync());
          dispatch(notiWitDAsync());
        }, 1000*60);
      } catch (error) {
        console.log(error);
        setInitEnvError(true);
        // history.push("/login");
      } finally {
        setInitEnv(true);
      }
    };

    loadEnv();
  }, []);


  // useEffect(() => {
  //   dispatch(profileAsync())
  //   dispatch(getActions());
  //   dispatch(notiDepoAsync());
  //   dispatch(notiWitDAsync());
  //   setInterval(() => {
  //     dispatch(notiDepoAsync());
  //     dispatch(notiWitDAsync());
  //   }, 1000*60);
  // }, []);
  if (!isInitEnv) return (<CircularProgress />
  );
  if (isInitEnvError) return "Cannot load env !!!";
  
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />

        <Routes>
          {local_token ?
            <Route path="*" element={<Navigate to="/" />} />
            : <Route path='Login' element={<Login />} />}


          {/* <Route path='Login' element={<Login />} /> */}
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Layout />}>
              {allActions?.find((x) => x.actionNo === "A007") ? (
                <Route path="/" element={<Dashboard />} />
              ) : (<Route path="/" element={<UnAction1 />} />)}

              {/* เริ่มหน้าDeposits */}

              <Route path="DepositsList" element={<DepositList />} >

                {allActions?.find((x) => x.actionNo === "A008") ? (
                  <Route path="ListMoney" element={<ListMoney />} />) : (<Route path="ListMoney" element={<UnAction />} />)}
                <Route path="DepoListMoney" element={<DepoListMoney />} />
                {allActions?.find((x) => x.actionNo === "A022") ? (
                  <Route path="DepoListMoney/MoneyDetail/:tscba_tscBankAccountID" element={<MoneyDetail />} />) : (<Route path="DepoListMoney/MoneyDetail/:tscba_tscBankAccountID" element={<UnAction />} />)}

                {allActions?.find((x) => x.actionNo === "A009") ? (
                  <Route path="ListUnknow" element={<ListUnknow />} />) : (<Route path="ListUnknow" element={<UnAction />} />)}
                <Route path="DepoListUnknow" element={<DepoListUnknow />} />
                {allActions?.find((x) => x.actionNo === "A023") ? (
                  <Route path="DepoListUnknow/InformationDetail/:tscba_tscBankAccountID" element={<InformationDetail />} />) : (<Route path="DepoListUnknow/InformationDetail/:tscba_tscBankAccountID" element={<UnAction />} />)}

                {allActions?.find((x) => x.actionNo === "A010") ? (
                  <Route path="ListCrypto" element={<ListCrypto />} />) : (<Route path="ListCrypto" element={<UnAction />} />)}
                <Route path="DepoListCrypto" element={<DepoListCrypto />} />

                {allActions?.find((x) => x.actionNo === "A011") ? (
                  <Route path="ListBonus" element={<ListBonus />} />) : (<Route path="ListBonus" element={<UnAction />} />)}
                <Route path="DepoListBonus" element={<DepoListBobus />} />

              </Route>
              {/* จบหน้าDeposits */}

              {/* เริ่มหน้าWithdaw */}
              <Route path="WithdawList" element={<WithdawList />} >

                {allActions?.find((x) => x.actionNo === "A012") ? (
                  <Route path="ListMoney" element={< WithdrawListMoney />} />) : (<Route path="ListMoney" element={<UnAction />} />)}
                {allActions?.find((x) => x.actionNo === "A024") ? (
                  <Route path="ListMoney/Detail/:tscba_tscBankAccountID" element={< WithdrawListMoneyDetail />} />) : (<Route path="ListMoney/Detail/:tscba_tscBankAccountID" element={<UnAction />} />)}

                {allActions?.find((x) => x.actionNo === "A013") ? (
                  <Route path="ListCrypto" element={<WithdrawListCrypto />} />) : (<Route path="ListCrypto" element={<UnAction />} />)}
                {allActions?.find((x) => x.actionNo === "A025") ? (
                  <Route path="ListCrypto/Detail/:tscba_tscBankAccountID" element={<WithdrawListCryptoDetail />} />) : (<Route path="ListCrypto/Detail/:tscba_tscBankAccountID" element={<UnAction />} />)}
              </Route>
              {/* จบหน้าWithdaw */}

              {allActions?.find((x) => x.actionNo === "A014") ? (
                <Route path="Report" element={<Report />} />) : (<Route path="Report" element={<UnAction1 />} />)}

              {/* เริ่มหน้าSettings */}
              <Route path="Settings" element={<Settings />} >

                {allActions?.find((x) => x.actionNo === "A015") ? (
                  <Route path="User" element={<User />} />) : (<Route path="User" element={<UnAction />} />)}
                {allActions?.find((x) => x.actionNo === "A027") ? (
                  <Route path="User/:userID" element={<UserDetail />} />) : (<Route path="User/:userID" element={<UnAction />} />)}
                {/* )} */}
                {/* {allActions?.find((x) => x.actionNo === "A003") && ( */}
                {allActions?.find((x) => x.actionNo === "A026") ? (
                  <Route path="User/CreateUser" element={<CreateUser />} />) : (<Route path="User/CreateUser" element={<UnAction />} />)}
                {/* )} */}

                {allActions?.find((x) => x.actionNo === "A016") ? (
                  <Route path="Permissions" element={<SetPermissions />} />) : (<Route path="Permissions" element={<UnAction />} />)}

                {allActions?.find((x) => x.actionNo === "A017") ? (
                  <Route path="ManagePermissions" element={<ManagePermissions />} />) : (<Route path="ManagePermissions" element={<UnAction />} />)}

                {allActions?.find((x) => x.actionNo === "A018") ? (
                  <Route path="ManageRole" element={<Role />} />) : (<Route path="ManageRole" element={<UnAction />} />)}

                {allActions?.find((x) => x.actionNo === "A019") ? (
                  <Route path="AccountInfo" element={<AccountInfo />} />) : (<Route path="AccountInfo" element={<UnAction />} />)}

                {/* {allActions?.find((x) => x.actionNo === "A020") && ( */}
                {allActions?.find((x) => x.actionNo === "A029") ? (
                  <Route path="AccountInfo/Add" element={<AddAccount />} />) : (<Route path="AccountInfo/Add" element={<UnAction />} />)}
                {/* )} */}
                {allActions?.find((x) => x.actionNo === "A028") ? (
                  <Route path="AccountInfo/Detail/:mba_bankAccID" element={<DetailAccount />} />) : (<Route path="AccountInfo/Detail/:mba_bankAccID" element={<UnAction />} />)}

                {allActions?.find((x) => x.actionNo === "A020") ? (
                  <Route path="Site" element={<Site />} />) : (<Route path="Site" element={<UnAction />} />)}
                <Route path="SiteList" element={<SiteList />} />
                {allActions?.find((x) => x.actionNo === "A031") ? (
                  <Route path="SiteList/Add" element={<AddSite />} />) : (<Route path="SiteList/Add" element={<UnAction />} />)}
                {allActions?.find((x) => x.actionNo === "A030") ? (
                  <Route path="SiteList/Update/:siteID" element={<UpdateSite />} />) : (<Route path="SiteList/Update/:siteID" element={<UnAction />} />)}

                {allActions?.find((x) => x.actionNo === "A021") ? (
                  <Route path="Approved" element={<Approved />} />) : (<Route path="Approved" element={<UnAction />} />)}
                <Route path="Approved/Add" element={<DetailApprove />} />


              </Route>

              {/* จบหน้าSettings */}

            </Route>
          </Route>

        </Routes>

      </LocalizationProvider>
    </ThemeProvider >
  )
}

export default App;
