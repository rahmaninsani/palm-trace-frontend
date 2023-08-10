import React, { memo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Form, Button } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { useForm, Controller } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";

import { messageConstant, bankConstant } from "../../constants";
import { userSchema } from "../../validations";
import { setMessage } from "../../features/authSlice";
import { Card } from "../elements";
import { userService } from "../../services";

const ProfilPetani = memo(() => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [profil, setProfil] = useState([]);
  const [koperasi, setKoperasi] = useState([]);
  const [selectedKoperasi, setSelectedKoperasi] = useState("");

  useEffect(() => {
    findOneUser();
    findAllKoperasi();
  }, []);

  const findOneUser = async () => {
    try {
      const response = await userService.findOne();
      setProfil(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const findAllKoperasi = async () => {
    try {
      const response = await userService.findAll({ userType: "koperasi" });
      setKoperasi(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    resolver: joiResolver(userSchema.updatePetani),
    mode: "all",
  });

  useEffect(() => {
    if (Object.keys(profil).length > 0) {
      setValue("nama", profil.nama);
      setValue("nik", profil.nik || "");
      setValue("alamat", profil.alamat);
      setValue("nomorTelepon", profil.nomorTelepon);
      setValue("namaBank", profil.namaBank);
      setValue("nomorRekening", profil.nomorRekening);
      setValue("email", profil.email);
      setValue("idKoperasi", profil.idKoperasi);

      if (profil.koperasi?.nama === "Koperasi Admin") return;
      setSelectedKoperasi(`${profil.koperasi?.nama} - ${profil.koperasi?.alamat}`);
    }
  }, [profil, setValue]);

  const onSubmit = async (data) => {
    try {
      const payload = { data };

      await userService.update(payload);

      dispatch(setMessage(messageConstant.profilSuccess));
      findOneUser();
    } catch (error) {
      dispatch(setMessage(error.response.data.message));
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Card.Body>
        {Object.keys(profil).length > 0 && (
          <Row>
            <Form.Group className="col-sm-12 form-group">
              <Form.Label htmlFor="nama">Nama Lengkap</Form.Label>
              <Form.Control type="text" id="nama" isInvalid={!!errors.nama} {...register("nama")} />
              {errors.nama && <Form.Control.Feedback type="invalid">{errors.nama.message}</Form.Control.Feedback>}
            </Form.Group>

            <Form.Group className="col-sm-12 form-group">
              <Form.Label htmlFor="nik">Nomor Induk Kependudukan (NIK)</Form.Label>
              <Form.Control type="text" id="nik" isInvalid={!!errors.nik} {...register("nik")} />
              {errors.nik && <Form.Control.Feedback type="invalid">{errors.nik.message}</Form.Control.Feedback>}
            </Form.Group>

            <Form.Group className="col-sm-12 form-group">
              <Form.Label htmlFor="nomorTelepon">Nomor Telepon</Form.Label>
              <Form.Control type="tel" id="nomorTelepon" isInvalid={!!errors.nomorTelepon} {...register("nomorTelepon")} />
              {errors.nomorTelepon && <Form.Control.Feedback type="invalid">{errors.nomorTelepon.message}</Form.Control.Feedback>}
            </Form.Group>

            <Form.Group className="col-sm-12 form-group">
              <Form.Label htmlFor="alamat">Alamat</Form.Label>
              <Form.Control as="textarea" rows={4} id="alamat" isInvalid={!!errors.alamat} {...register("alamat")} />
              {errors.alamat && <Form.Control.Feedback type="invalid">{errors.alamat.message}</Form.Control.Feedback>}
            </Form.Group>

            <Form.Group className="col-md-6 form-group">
              <Form.Label htmlFor="namaBank">Nama Bank</Form.Label>
              <Controller
                name="namaBank"
                control={control}
                render={({ field }) => (
                  <Typeahead
                    {...field}
                    id="namaBank"
                    options={bankConstant.map((bank) => bank.name)}
                    labelKey="label"
                    selected={field.value ? [field.value] : []}
                    value={field.value}
                    onChange={(selected) => field.onChange(selected[0])}
                    placeholder="Pilih nama bank..."
                    allowNew={false}
                    isInvalid={!!errors.namaBank}
                  />
                )}
              />
              {errors.namaBank && <Form.Control.Feedback type="invalid">{errors.namaBank.message}</Form.Control.Feedback>}
            </Form.Group>

            <Form.Group className="col-md-6 form-group">
              <Form.Label htmlFor="nomorRekening">Nomor Rekening</Form.Label>
              <Form.Control type="text" id="nomorRekening" isInvalid={!!errors.nomorRekening} {...register("nomorRekening")} />
              {errors.nomorRekening && <Form.Control.Feedback type="invalid">{errors.nomorRekening.message}</Form.Control.Feedback>}
            </Form.Group>

            <Form.Group className="col-md-6 form-group">
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control type="email" id="email" isInvalid={!!errors.email} {...register("email")} />
              {errors.email && <Form.Control.Feedback type="invalid">{errors.email.message}</Form.Control.Feedback>}
            </Form.Group>

            <Form.Group className="col-md-6 form-group">
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control type="password" id="password" isInvalid={!!errors.password} {...register("password")} placeholder="Hanya masukan password jika akan diubah" />
              {errors.password && <Form.Control.Feedback type="invalid">{errors.password.message}</Form.Control.Feedback>}
            </Form.Group>

            <Form.Group className="col-sm-12 form-group">
              <Form.Label htmlFor="idKoperasi">Keanggotaan Koperasi</Form.Label>
              <Controller
                name="idKoperasi"
                control={control}
                render={({ field }) => (
                  <Typeahead
                    {...field}
                    id="idKoperasi"
                    options={koperasi.map((item) => ({
                      id: item.id,
                      label: `${item.nama} - ${item.alamat}`,
                    }))}
                    labelKey="label"
                    selected={selectedKoperasi ? [selectedKoperasi] : []}
                    onChange={(selected) => {
                      setSelectedKoperasi(selected[0]);
                      field.onChange(selected[0] ? selected[0].id : "");
                    }}
                    placeholder="Pilih koperasi..."
                    allowNew={false}
                    disabled={user.profilLengkap}
                  />
                )}
              />
              {!user.profilLengkap && <p className="form-text text-danger">Hanya bisa diubah satu kali</p>}
              {errors.idKoperasi && <Form.Control.Feedback type="invalid">{errors.idKoperasi.message}</Form.Control.Feedback>}
            </Form.Group>
          </Row>
        )}
      </Card.Body>

      <Card.Footer className="text-center">
        <Button type="submit" variant="btn btn-primary" disabled={!isValid}>
          Simpan
        </Button>
      </Card.Footer>
    </Form>
  );
});

export default ProfilPetani;
