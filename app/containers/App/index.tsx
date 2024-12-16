/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import NotFoundPage from 'containers/NotFoundPage/Loadable';
import GlobalStyle from '../../global-styles';
import Login from 'containers/Auth/Login';
import { LanguageTools } from 'utils/languageTools';
import Register from 'containers/Auth/Register';
import RememberPassword from 'containers/Auth/Login/RememberPassword';
import ChangePassword from 'containers/Auth/Login/RememberPassword/changepassword';
import UserAuthorization from '../Auth/UserAuthorize';
import { UserProfile } from 'containers/User/UserProfile';
import Header from 'containers/App/Header';
import Footer from 'containers/App/Footer';
import Wallet from 'containers/Wallet';
import UserTransActionHistory from 'containers/UserTransActionHistory';
import { Referral } from '../../containers/UserTransActionHistory/Referral';
import MobileReferral from '../../containers/User/UserProfile/MobileReferral/MobileReferral';

import Exchange from '../../containers/Exchange/index';
import BuyAndSell from '../../containers/BuyAndSell/index';
import MobileCreditCard from '../../containers/User/UserProfile/MobileCreditCard';
import MobileSecuritySetting from '../../containers/User/UserProfile/MobileSecuritySetting';

import Order from 'containers/Order';

import TokenManager from '../../utils/TokenManager';
import TOTP from '../Auth/TOTP';
import ResetTOTP from '../Auth/ResetTotp';
import LandingPage from '../LandingPage';

import ProtectedRoute from 'components/ProtectedRoute';
import RXMain from 'components/RXMain';

import AppBody from './AppBody';
import BlurredModal from '../BlurredModal';
import { Toast } from '../../components/Toast';
import OnlineBroker from '../Exchange/OnlineBroker';
import { RWebSocket } from './Websocket/websocket';
import DepositWithdraw from 'containers/DepositWithdraw';
import Ticket from 'containers/Ticket/Ticket';
import TicketDetail from 'containers/Ticket/detail/detail';
import TicketSend from 'containers/Ticket/send/send';
import TicketMessages from 'containers/Ticket/messages/Messages';
import { Box } from '@chakra-ui/react';
import FAQ from 'containers/Ticket/faq';
import KYC from 'containers/KYC';
import Landline from 'containers/KYC/Landline';

export default function App() {
  const language = LanguageTools();
  const Landing = () => {
    return (
      <>
        <Header />
        <Switch>
          <Route exact path="/landing" component={props => <LandingPage {...props} dir={language.Dir} />} />
        </Switch>
        <Footer />
      </>
    );
  };

  const SiteMain = () => {
    return (
      <>
        <Header />
        <RXMain colorScheme="#f4f6fa">
          <Box maxWidth="1440px" margin="0 auto">
            <Switch>
              <Route
                exact
                path="/dashboard/profile"
                component={props => <UserProfile {...props} dir={language.Dir} />}
              />
            </Switch>
            <Route
              exact
              path="/dashboard/profile/bank"
              component={props => <MobileCreditCard {...props} dir={language.Dir} />}
            />
            <Route
              exact
              path="/dashboard/profile/security"
              component={props => <MobileSecuritySetting {...props} dir={language.Dir} />}
            />

            <Route
              exact
              path="/dashboard/transaction"
              component={props => <UserTransActionHistory {...props} dir={language.Dir} />}
            />
            <Route exact path="/dashboard/referral" component={props => <Referral {...props} dir={language.Dir} />} />

            <Route
              exact
              path="/dashboard/mobile-referral"
              component={props => <MobileReferral {...props} dir={language.Dir} />}
            />

            <Route exact path="/dashboard/ticket" component={props => <Ticket {...props} dir={language.Dir} />} />

            <Route
              exact
              path="/dashboard/ticket/faq/:detail"
              component={props => <TicketDetail {...props} dir={language.Dir} />}
            />

            <Route
              exact
              path="/dashboard/ticket/send"
              component={props => <TicketSend {...props} dir={language.Dir} />}
            />

            <Route
              exact
              path="/dashboard/ticket/messages/:id"
              component={props => <TicketMessages {...props} dir={language.Dir} />}
            />

            <Route exact path="/dashboard/ticket/faq" component={props => <FAQ {...props} dir={language.Dir} />} />

            <Route exact path="/dashboard/exchange" component={props => <Exchange {...props} />} />

            <Route exact path="/dashboard/buyandsell" component={props => <BuyAndSell {...props} />} />

            <Route exact path="/dashboard/wallet" component={props => <Wallet {...props} />} />

            <Route exact path="/dashboard/exchange/online" component={props => <OnlineBroker {...props} />} />

            <Route exact path="/dashboard/depositandwithdraw" component={props => <DepositWithdraw {...props} />} />

            <Route exact path="/dashboard/order/:irr/:currency/:change" component={props => <Order {...props} />} />
          </Box>
        </RXMain>
        <Footer />
      </>
    );
  };
  const DefaultRoute = () => {
    return TokenManager.authenticated() ? <Redirect to="/dashboard" /> : <Redirect to="/auth/login" />;
  };
  const AuthorizationSection = () => {
    return (
        <Switch>
          <Route exact path="/kyc" component={props => <KYC/>} />
          <Route exact path="/kyc/landline" component={props => <Landline/>} />
          <Route exact path="/kyc/authorization/:step" component={props => <UserAuthorization {...props} />} />
          <Route exact path="/kyc/authorization" component={props => <UserAuthorization {...props} />} />
        </Switch>
    );
  };
  const SiteLogin = () => {
    return (
      <RXMain colorScheme="#1652f0">
        <Switch>
          <Route exact path="/auth/login" component={props => <Login {...props} dir={language.Dir} />} />
          <Route exact path="/auth/totp/" component={props => <TOTP {...props} />} />
          <Route exact path="/auth/totp/reset" component={props => <ResetTOTP {...props} />} />
          <Route exact path="/auth/totp/reset/:step" component={props => <ResetTOTP {...props} />} />
          <Route exact path="/auth/register" component={props => <Register {...props} dir={language.Dir} />} />
          <Route exact path="/auth/register/:ref" component={props => <Register {...props} dir={language.Dir} />} />
          <Route
            exact
            path="/auth/login/forget"
            component={props => <RememberPassword {...props} dir={language.Dir} />}
          />
          <Route exact path="/auth/login/changepassword" component={props => <ChangePassword />} />
        </Switch>
      </RXMain>
    );
  };

  return (
    <>
      <AppBody>
        <RWebSocket>
          <Switch>
            <Route path="/auth" component={props => <SiteLogin {...props} dir={language.Dir} />} />

            <ProtectedRoute path="/dashboard" component={props => <SiteMain />} />

            <ProtectedRoute path="/kyc" component={props => <AuthorizationSection />} />

            <ProtectedRoute path="/landing" component={props => <Landing />} />

            <Route path="/login" component={props => <Redirect to="/auth/login" />} />
            <Route exact path="/" component={DefaultRoute} />
            <Route component={NotFoundPage} />
          </Switch>
        </RWebSocket>
      </AppBody>

      <BlurredModal />
      <Toast />
      <GlobalStyle />
    </>
  );
}
