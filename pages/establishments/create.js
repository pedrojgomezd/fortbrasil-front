import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import { clientHttp } from "../../services/clientHttp";
import Card from "../../src/Card";
import Button from "../../src/common/Button";
import IconElement from "../../src/common/IconElement";
import { establishmentValidationSchema } from "../../src/form/establishmentValidationSchema";
import FormBasic from "../../src/form/FormBasic";
import Layouts from "../../src/Layouts";

const CustomerCreate = () => {
  const [loading, setLoading] = useState(false);
  const route = useRouter();

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
        .post("establishments", value)
        .then(({ data }) => {
          setLoading(false);
          route.push(`/establishments/${data.id}`);
        })
        .catch(() => setLoading(false));
    },
    validationSchema: establishmentValidationSchema,
  });
  return (
    <Layouts title="Create Establishment">
      <div className="flex justify-between w-full items-center">
        <h3 className="text-2xl text-gray-700 font-semibold flex gap-2 items-center">
          <IconElement icon="User" />
          Establishment create
        </h3>
        <div>
          <Link href="/establishments">
            <a>
              <Button label="Back" icon="ArrowLeft" variant="default" />
            </a>
          </Link>
        </div>
      </div>
      <div className="mt-8">
        <Card>
          <FormBasic {...{ formik, loading }} />
        </Card>
      </div>
    </Layouts>
  );
};

export default CustomerCreate;
