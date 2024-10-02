import { useNavigate, useParams } from "react-router";

export function addHookTo(Component) {
  function CompWithHook(props) {
    const navigate = useNavigate();
    const params = useParams();

    return <Component {...props} params={params} navigate={navigate} />;
  }

  return CompWithHook;
}
