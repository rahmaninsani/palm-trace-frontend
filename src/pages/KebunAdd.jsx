import React, { memo, useState, useEffect, useMemo, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Container, Row, Form, Button, InputGroup } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { joiResolver } from "@hookform/resolvers/joi";

import { endpointConstant, messageConstant, bankConstant } from "../constants";
import { userSchema } from "../validations";
import { setMessage } from "../features/authSlice";
import { Card } from "../components/elements";
import { kebunService } from "../services";

const getReverseGeocode = async (lat, lng) => {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching reverse geocode:", error);
    return null;
  }
};

const LocationMarker = ({ setLocation }) => {
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      const { latlng } = e;
      const duration = 3;

      map.flyTo(latlng, map.getZoom(), { duration });

      setTimeout(async () => {
        const reverseGeocodeData = await getReverseGeocode(latlng.lat, latlng.lng);
        setLocation({
          lat: latlng.lat,
          lng: latlng.lng,
          alamat: reverseGeocodeData.display_name,
        });
      }, duration * 1000);
    },
  });

  return null;
};

const SearchField = () => {
  const provider = new OpenStreetMapProvider({
    params: {
      "accept-language": "id",
      countrycodes: "id",
    },
  });

  const searchControl = new GeoSearchControl({
    provider: provider,
    style: "bar",
    searchLabel: "Cari lokasi...",
    notFoundMessage: "Alamat tidak ditemukan",
  });

  const map = useMap();

  useEffect(() => {
    map.addControl(searchControl);
    return () => map.removeControl(searchControl);
  }, [map]);

  return null;
};

const KebunAdd = memo(() => {
  const pageTitle = "Tambah Kebun";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setTitle } = useOutletContext();
  const markerRef = useRef(null);
  const [location, setLocation] = useState({ lat: -6.2, lng: 106.816666, alamat: "Jakarta, Indonesia" });

  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    resolver: joiResolver(userSchema.createKebunPetani),
    mode: "all",
  });

  useEffect(() => {
    setTitle(pageTitle);
  }, []);

  useEffect(() => {
    if (location) {
      setValue("latitude", location.lat);
      setValue("longitude", location.lng);
      setValue("alamat", location.alamat);
    }
  }, [location, setValue]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          if (data[key] instanceof FileList) {
            formData.append(key, data[key][0]);
          } else {
            formData.append(key, data[key]);
          }
        }
      }

      const payload = { data: formData };
      await kebunService.create(payload);

      dispatch(setMessage(messageConstant.kebunSuccess));
      navigate(endpointConstant.profil, { replace: true });
    } catch (error) {
      dispatch(setMessage(error.response.data.message));
    }
  };

  const SetViewOnClick = () => {
    const map = useMap();
    map.setView([location.lat, location.lng], map.getZoom());

    return null;
  };

  const eventHandlers = useMemo(
    () => ({
      async dragend() {
        const marker = markerRef.current;

        if (marker != null) {
          const { lat, lng } = marker.getLatLng();
          const reverseGeocodeData = await getReverseGeocode(lat, lng);
          setLocation({
            lat: lat,
            lng: lng,
            alamat: reverseGeocodeData.display_name,
          });
        }
      },
    }),
    []
  );

  return (
    <Card>
      <Form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <Card.Header>
          <Container>
            <Row>
              <MapContainer
                center={[location.lat, location.lng]}
                zoom={13}
                scrollWheelZoom={false}
                style={{
                  height: "500px",
                  width: "100%",
                  borderRadius: "12px",
                  overflow: "hidden",
                }}
              >
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <SearchField />
                <Marker position={[location.lat, location.lng]} draggable={true} ref={markerRef} eventHandlers={eventHandlers}>
                  <LocationMarker setLocation={setLocation} />
                  <Popup>
                    <p className="text-primary">{location.alamat}</p>
                  </Popup>
                  <SetViewOnClick />
                </Marker>
              </MapContainer>
              <p className="mt-2 form-text text-info">Pilih lokasi kebun dengan memindahkan penanda peta</p>
            </Row>
          </Container>
        </Card.Header>

        <Card.Body>
          <Row>
            <Form.Group className="col-md-6 form-group">
              <Form.Label htmlFor="latitude">Latitude</Form.Label>
              <Controller name="latitude" control={control} defaultValue={location.lat} render={({ field }) => <Form.Control type="text" id="latitude" value={field.value} onChange={field.onChange} readOnly disabled />} />
              {errors.latitude && <Form.Control.Feedback type="invalid">{errors.latitude.message}</Form.Control.Feedback>}
            </Form.Group>

            <Form.Group className="col-md-6 form-group">
              <Form.Label htmlFor="longitude">Longitude</Form.Label>
              <Controller name="longitude" control={control} defaultValue={location.lng} render={({ field }) => <Form.Control type="text" id="longitude" value={field.value} onChange={field.onChange} readOnly disabled />} />
              {errors.longitude && <Form.Control.Feedback type="invalid">{errors.longitude.message}</Form.Control.Feedback>}
            </Form.Group>

            <Form.Group className="col-sm-12 form-group">
              <Form.Label htmlFor="alamat">Alamat Lengkap</Form.Label>
              <Controller
                name="alamat"
                control={control}
                defaultValue={location.alamat}
                render={({ field }) => <Form.Control as="textarea" rows={4} id="alamat" value={field.value} onChange={field.onChange} isInvalid={!!errors.alamat} />}
              />
              {errors.alamat && <Form.Control.Feedback type="invalid">{errors.alamat.message}</Form.Control.Feedback>}
            </Form.Group>

            <Form.Group className="col-md-6 form-group">
              <Form.Label htmlFor="luas">Luas</Form.Label>
              <InputGroup>
                <Form.Control type="number" min="1" id="luas" isInvalid={!!errors.luas} {...register("luas")} />
                <InputGroup.Text>Ha</InputGroup.Text>
                {errors.luas && <Form.Control.Feedback type="invalid">{errors.luas.message}</Form.Control.Feedback>}
              </InputGroup>
            </Form.Group>

            <Form.Group className="col-md-6 form-group">
              <Form.Label htmlFor="kemampuanProduksiHarian">Kemampuan Produksi Harian</Form.Label>
              <InputGroup>
                <Form.Control type="number" min="1" id="kemampuanProduksiHarian" isInvalid={!!errors.kemampuanProduksiHarian} {...register("kemampuanProduksiHarian")} />
                <InputGroup.Text>kg</InputGroup.Text>
                {errors.kemampuanProduksiHarian && <Form.Control.Feedback type="invalid">{errors.kemampuanProduksiHarian.message}</Form.Control.Feedback>}
              </InputGroup>
            </Form.Group>

            <Form.Group className="col-md-6 form-group">
              <Form.Label htmlFor="nomorSuratKeteranganLurah">Nomor Surat Keterangan Lurah</Form.Label>
              <Form.Control id="nomorSuratKeteranganLurah" isInvalid={!!errors.nomorSuratKeteranganLurah} {...register("nomorSuratKeteranganLurah")} />
              {errors.nomorSuratKeteranganLurah && <Form.Control.Feedback type="invalid">{errors.nomorSuratKeteranganLurah.message}</Form.Control.Feedback>}
            </Form.Group>

            <Form.Group className="col-md-6 form-group">
              <Form.Label htmlFor="suratKeteranganLurah" className="custom-file-input">
                Surat Keterangan Lurah
              </Form.Label>
              <Form.Control type="file" id="suratKeteranganLurah" isInvalid={!!errors.suratKeteranganLurah} {...register("suratKeteranganLurah")} />
              {errors.suratKeteranganLurah && <Form.Control.Feedback type="invalid">{errors.suratKeteranganLurah.message}</Form.Control.Feedback>}
            </Form.Group>

            <Form.Group className="col-md-6 form-group">
              <Form.Label htmlFor="nomorSuratKeteranganGantiRugi">Nomor Surat Keterangan Ganti Rugi</Form.Label>
              <Form.Control id="nomorSuratKeteranganGantiRugi" isInvalid={!!errors.nomorSuratKeteranganGantiRugi} {...register("nomorSuratKeteranganGantiRugi")} />
              {errors.nomorSuratKeteranganGantiRugi && <Form.Control.Feedback type="invalid">{errors.nomorSuratKeteranganGantiRugi.message}</Form.Control.Feedback>}
            </Form.Group>

            <Form.Group className="col-md-6 form-group">
              <Form.Label htmlFor="suratKeteranganGantiRugi" className="custom-file-input">
                Surat Keterangan Ganti Rugi
              </Form.Label>
              <Form.Control type="file" id="suratKeteranganGantiRugi" isInvalid={!!errors.suratKeteranganGantiRugi} {...register("suratKeteranganGantiRugi")} />
              {errors.suratKeteranganGantiRugi && <Form.Control.Feedback type="invalid">{errors.suratKeteranganGantiRugi.message}</Form.Control.Feedback>}
            </Form.Group>

            <Form.Group className="col-md-6 form-group">
              <Form.Label htmlFor="nomorSertifikatHakMilik">Nomor Sertifikat Hak Milik</Form.Label>
              <Form.Control id="nomorSertifikatHakMilik" isInvalid={!!errors.nomorSertifikatHakMilik} {...register("nomorSertifikatHakMilik")} />
              {errors.nomorSertifikatHakMilik && <Form.Control.Feedback type="invalid">{errors.nomorSertifikatHakMilik.message}</Form.Control.Feedback>}
            </Form.Group>

            <Form.Group className="col-md-6 form-group">
              <Form.Label htmlFor="sertifikatHakMilik" className="custom-file-input">
                Sertifikat Hak Milik
              </Form.Label>
              <Form.Control type="file" id="sertifikatHakMilik" isInvalid={!!errors.sertifikatHakMilik} {...register("sertifikatHakMilik")} />
              {errors.sertifikatHakMilik && <Form.Control.Feedback type="invalid">{errors.sertifikatHakMilik.message}</Form.Control.Feedback>}
            </Form.Group>

            <Form.Group className="col-md-6 form-group">
              <Form.Label htmlFor="nomorSuratTandaBudidaya">Nomor Surat Tanda Budidaya</Form.Label>
              <Form.Control id="nomorSuratTandaBudidaya" isInvalid={!!errors.nomorSuratTandaBudidaya} {...register("nomorSuratTandaBudidaya")} />
              {errors.nomorSuratTandaBudidaya && <Form.Control.Feedback type="invalid">{errors.nomorSuratTandaBudidaya.message}</Form.Control.Feedback>}
            </Form.Group>

            <Form.Group className="col-md-6 form-group">
              <Form.Label htmlFor="suratTandaBudidaya" className="custom-file-input">
                Surat Tanda Budidaya
              </Form.Label>
              <Form.Control type="file" id="suratTandaBudidaya" isInvalid={!!errors.suratTandaBudidaya} {...register("suratTandaBudidaya")} />
              {errors.suratTandaBudidaya && <Form.Control.Feedback type="invalid">{errors.suratTandaBudidaya.message}</Form.Control.Feedback>}
            </Form.Group>

            <Form.Group className="col-md-6 form-group">
              <Form.Label htmlFor="nomorSertifikatRspo">Nomor Sertifikat RSPO</Form.Label>
              <Form.Control id="nomorSertifikatRspo" isInvalid={!!errors.nomorSertifikatRspo} {...register("nomorSertifikatRspo")} />
              {errors.nomorSertifikatRspo && <Form.Control.Feedback type="invalid">{errors.nomorSertifikatRspo.message}</Form.Control.Feedback>}
            </Form.Group>

            <Form.Group className="col-md-6 form-group">
              <Form.Label htmlFor="sertifikatRspo" className="custom-file-input">
                Sertifikat RSPO
              </Form.Label>
              <Form.Control type="file" id="sertifikatRspo" isInvalid={!!errors.sertifikatRspo} {...register("sertifikatRspo")} />
              {errors.sertifikatRspo && <Form.Control.Feedback type="invalid">{errors.sertifikatRspo.message}</Form.Control.Feedback>}
            </Form.Group>

            <Form.Group className="col-md-6 form-group">
              <Form.Label htmlFor="nomorSertifikatIspo">Nomor Sertifikat ISPO</Form.Label>
              <Form.Control id="nomorSertifikatIspo" isInvalid={!!errors.nomorSertifikatIspo} {...register("nomorSertifikatIspo")} />
              {errors.nomorSertifikatIspo && <Form.Control.Feedback type="invalid">{errors.nomorSertifikatIspo.message}</Form.Control.Feedback>}
            </Form.Group>

            <Form.Group className="col-md-6 form-group">
              <Form.Label htmlFor="sertifikatIspo" className="custom-file-input">
                Sertifikat ISPO
              </Form.Label>
              <Form.Control type="file" id="sertifikatIspo" isInvalid={!!errors.sertifikatIspo} {...register("sertifikatIspo")} />
              {errors.sertifikatIspo && <Form.Control.Feedback type="invalid">{errors.sertifikatIspo.message}</Form.Control.Feedback>}
            </Form.Group>

            <Form.Group className="col-md-6 form-group">
              <Form.Label htmlFor="nomorSertifikatIscc">Nomor Sertifikat ISCC</Form.Label>
              <Form.Control id="nomorSertifikatIscc" isInvalid={!!errors.nomorSertifikatIscc} {...register("nomorSertifikatIscc")} />
              {errors.nomorSertifikatIscc && <Form.Control.Feedback type="invalid">{errors.nomorSertifikatIscc.message}</Form.Control.Feedback>}
            </Form.Group>

            <Form.Group className="col-md-6 form-group">
              <Form.Label htmlFor="sertifikatIscc" className="custom-file-input">
                Sertifikat ISCC
              </Form.Label>
              <Form.Control type="file" id="sertifikatIscc" isInvalid={!!errors.sertifikatIscc} {...register("sertifikatIscc")} />
              {errors.sertifikatIscc && <Form.Control.Feedback type="invalid">{errors.sertifikatIscc.message}</Form.Control.Feedback>}
            </Form.Group>
          </Row>
        </Card.Body>

        <Card.Footer className="text-center">
          <Button type="submit" variant="btn btn-primary" disabled={!isValid}>
            Simpan
          </Button>
        </Card.Footer>
      </Form>
    </Card>
  );
});

export default KebunAdd;
