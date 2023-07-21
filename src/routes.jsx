import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import Spacings from '@commercetools-uikit/spacings';
import Channels from './components/channels';
import Welcome from './components/welcome';
import Products from './components/demo-component';
import ProductDetails from './components/demo-component/product-details';

const ApplicationRoutes = () => {
  const match = useRouteMatch();

  const { push } = useHistory();

  /**
   * When using routes, there is a good chance that you might want to
   * restrict the access to a certain route based on the user permissions.
   * You can evaluate user permissions using the `useIsAuthorized` hook.
   * For more information see https://docs.commercetools.com/custom-applications/development/permissions
   *
   * NOTE that by default the Custom Application implicitly checks for a "View" permission,
   * otherwise it won't render. Therefore, checking for "View" permissions here
   * is redundant and not strictly necessary.
   */

  return (
    <Spacings.Inset scale="l">
      <Switch>
        <Route path={`${match.path}/channels`}>
          <Channels linkToWelcome={match.url} />
        </Route>
        <Route path={`${match.path}/demo-channels`}>
          <Products linkToWelcome={match.url} />
        </Route>
        <Route>
          <Welcome />
        </Route>
      </Switch>
      <Switch>
        <Route path={`${match.path}/demo-channels/:id`}>
          <ProductDetails
            onClose={() => push(`${match.url}/demo-channels`)}
            linkToWelcome={match.url}
          />
        </Route>
      </Switch>
    </Spacings.Inset>
  );
};
ApplicationRoutes.displayName = 'ApplicationRoutes';

export default ApplicationRoutes;
