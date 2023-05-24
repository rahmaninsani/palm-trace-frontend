import { ROLE } from "../config";

const authLogin = (email, _) => {
  switch (email) {
    case "petani@gmail.com":
      localStorage.setItem("role", ROLE.PETANI);
      localStorage.setItem("nama", "Budi");
      localStorage.setItem("jenis", "Petani");
      return `/${ROLE.PETANI}`;

    case "koperasi@gmail.com":
      localStorage.setItem("role", ROLE.KOPERASI);
      localStorage.setItem("nama", "KUD Sawit Makmur");
      localStorage.setItem("jenis", "Koperasi");
      return `/${ROLE.KOPERASI}`;

    case "pks@gmail.com":
      localStorage.setItem("role", ROLE.PKS);
      localStorage.setItem("nama", "PT Sawit Nusantara");
      localStorage.setItem("jenis", "Pabrik Kelapa Sawit");
      return `/${ROLE.PKS}`;

    case "dinas@gmail.com":
      localStorage.setItem("role", ROLE.DINAS);
      localStorage.setItem("nama", "BPDPKS");
      localStorage.setItem("jenis", "Dinas");
      return `/${ROLE.DINAS}`;
  }
};

export default authLogin;
