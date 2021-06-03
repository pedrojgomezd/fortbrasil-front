import React, { useCallback } from "react";
import Button from "../common/Button";
import Input from "./Input";

const FormBasic = ({ formik, loading, setFile, containtFile = false }) => {
  const searchCEP = useCallback(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_CEP_URL}${formik.values.address?.cep}/json/`
    )
      .then((response) => response.json())
      .then((data) => formik.setValues({ ...formik.values, address: data }));
  }, [formik.values.address?.cep]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="grid grid-cols-2 gap-4 mt-12">
        <div className="">
          <Input
            label="Razon Social"
            iconLeft="User"
            placeholder="Razon social"
            type="text"
            name="razon_social"
            onChange={formik.handleChange}
            value={formik.values.razon_social}
            touched={formik.touched.razon_social}
            error={formik.errors.razon_social}
          />
        </div>
        <div>
          <Input
            iconLeft="Hash"
            placeholder="Cnpj"
            label="Cnpj"
            type="text"
            name="cnpj"
            onChange={formik.handleChange}
            value={formik.values.cnpj}
            touched={formik.touched.cnpj}
            error={formik.errors.cnpj}
          />
        </div>
        {containtFile && (
          <div>
            <Input
              label="Photo"
              iconLeft="Camera"
              placeholder="Photo"
              type="file"
              name="avatar"
              onChange={(e) => {
                formik.handleChange(e);
                setFile(e.currentTarget.files[0]);
              }}
              value={formik.values.avatar}
              touched={formik.touched.avatar}
              error={formik.errors.avatar}
            />
          </div>
        )}
      </div>
      <div>
        <h3>Endereco</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Input
              iconLeft="Hash"
              placeholder="CEP"
              label="CEP"
              type="text"
              name="address.cep"
              onChange={formik.handleChange}
              value={formik.values.address?.cep}
              touched={formik.touched.cep}
              error={formik.errors.address?.cep}
              onBlur={searchCEP}
            />
          </div>
          <div>
            <Input
              iconLeft="Hash"
              placeholder="Logradouro"
              label="Logradouro"
              type="text"
              name="address.logradouro"
              onChange={formik.handleChange}
              value={formik.values.address?.logradouro}
              touched={formik.touched.logradouro}
              error={formik.errors.address?.logradouro}
            />
          </div>
          <div>
            <Input
              iconLeft="Hash"
              placeholder="Complemento"
              label="Complemento"
              type="text"
              name="address.complemento"
              onChange={formik.handleChange}
              value={formik.values.address?.complemento}
              touched={formik.touched.complemento}
              error={formik.errors.address?.complemento}
            />
          </div>
          <div>
            <Input
              iconLeft="Hash"
              placeholder="Bairro"
              label="Bairro"
              type="text"
              name="address.bairro"
              onChange={formik.handleChange}
              value={formik.values.address?.bairro}
              touched={formik.touched.bairro}
              error={formik.errors.address?.bairro}
            />
          </div>
          <div>
            <Input
              iconLeft="Hash"
              placeholder="Localidade"
              label="Localidade"
              type="text"
              name="address.localidade"
              onChange={formik.handleChange}
              value={formik.values.address?.localidade}
              touched={formik.touched.localidade}
              error={formik.errors.address?.localidade}
            />
          </div>
          <div>
            <Input
              iconLeft="Hash"
              placeholder="uf"
              label="UF"
              type="text"
              name="address.uf"
              onChange={formik.handleChange}
              value={formik.values.address?.uf}
              touched={formik.touched.uf}
              error={formik.errors.address?.uf}
            />
          </div>
        </div>
      </div>

      <div className="">
        <Button
          label="Register"
          className="w-full justify-center"
          type="submit"
          variant="primary"
          {...{ loading }}
        />
      </div>
    </form>
  );
};

export default FormBasic;
