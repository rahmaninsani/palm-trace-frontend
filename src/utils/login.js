import { ROLE } from "../config";

const authLogin = (email, _) => {
  switch (email) {
    case "petani@gmail.com":
      localStorage.setItem("role", ROLE.PETANI);
      return `/${ROLE.PETANI}`;

    case "koperasi@gmail.com":
      localStorage.setItem("role", ROLE.KOPERASI);
      return `/${ROLE.KOPERASI}`;

    case "pks@gmail.com":
      localStorage.setItem("role", ROLE.PKS);
      return `/${ROLE.PKS}`;
  }
};

export default authLogin;
