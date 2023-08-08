import React, { memo, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Row, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";

import { messageConstant } from "../../constants";
import { userSchema } from "../../validations";
import { setMessage } from "../../features/authSlice";
import { Card } from "../elements";
import { userService } from "../../services";

const ProfilDinas = memo(() => {
  const dispatch = useDispatch();
  const [profil, setProfil] = useState([]);

  useEffect(() => {
    findOneUser();
  }, []);

  const findOneUser = async () => {
    try {
      const response = await userService.findOne();
      setProfil(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    resolver: joiResolver(userSchema.updateDinas),
    mode: "all",
  });

  useEffect(() => {
    if (Object.keys(profil).length > 0) {
      setValue("nama", profil.nama);
      setValue("alamat", profil.alamat);
      setValue("nomorTelepon", profil.nomorTelepon);
      setValue("email", profil.email);
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
        <Row>
          <Form.Group className="col-sm-12 form-group">
            <Form.Label htmlFor="nama">Nama Dinas</Form.Label>
            <Form.Control type="text" id="nama" isInvalid={!!errors.nama} {...register("nama")} />
            {errors.nama && <Form.Control.Feedback type="invalid">{errors.nama.message}</Form.Control.Feedback>}
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
            <Form.Label htmlFor="email">Email</Form.Label>
            <Form.Control type="email" id="email" isInvalid={!!errors.email} {...register("email")} />
            {errors.email && <Form.Control.Feedback type="invalid">{errors.email.message}</Form.Control.Feedback>}
          </Form.Group>

          <Form.Group className="col-md-6 form-group">
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control type="password" id="password" isInvalid={!!errors.password} {...register("password")} placeholder="Hanya masukan password jika akan diubah" />
            {errors.password && <Form.Control.Feedback type="invalid">{errors.password.message}</Form.Control.Feedback>}
          </Form.Group>
        </Row>
      </Card.Body>

      <Card.Footer className="text-center">
        <Button type="submit" variant="btn btn-primary" disabled={!isValid}>
          Simpan
        </Button>
      </Card.Footer>
    </Form>
  );
});

export default ProfilDinas;
