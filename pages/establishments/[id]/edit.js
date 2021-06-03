import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useFormik } from "formik";

import { clientHttp } from "../../../services/clientHttp";
import Layouts from "../../../src/Layouts";
import FormBasic from "../../../src/form/FormBasic";
import { establishmentValidationSchema } from "../../../src/form/establishmentValidationSchema";

const EstablishmentsDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(false);

  const [establishment, setEstablishment] = useState([]);

  const formik = useFormik({
    initialValues: {
      cnpj: "",
      razon_social: "",
      address: {
        cep: "",
        logradouro: "",
        complemento: "",
        bairro: "",
        localidade: "",
        uf: "",
      },
    },
    onSubmit: (value) => {
      setLoading(true);
      clientHttp
        .put(`establishments/${id}`, value)
        .then(({ data }) => {
          router.push(`/establishments/${data.id}`);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    },
    validationSchema: establishmentValidationSchema,
  });

  const fetchEstablishment = useCallback(async () => {
    setLoading(true);
    const { data } = await clientHttp.get(`establishments/${id}`);
    setEstablishment(data);
    setLoading(false);
    formik.setValues(data);
  }, [id]);

  useEffect(() => {
    if (id >= 1 && id !== undefined) {
      fetchEstablishment();
    }

    return () => true;
  }, [id]);

  return (
    <Layouts title="Establishment">
      <div>
        <h3 className="text-2xl text-gray-700 font-semibold">
          Establishment: {establishment.razon_social} / Edit
        </h3>
      </div>
      <div className="flex gap-4">
        <div className="w-full">
          <FormBasic {...{ formik, loading }} />
        </div>
      </div>
    </Layouts>
  );
};

export default EstablishmentsDetailsPage;
