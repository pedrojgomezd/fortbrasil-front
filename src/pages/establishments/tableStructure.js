import React from "react";
import { Edit, Eye } from "react-feather";
import Link from "next/link";

export const columnsEstablishments = [
  {
    key: "id",
    title: "Id",
    dataIndex: "id",
  },
  {
    key: "razon_social",
    title: "Razon Social",
    dataIndex: "razon_social",
  },
  {
    key: "cnpj",
    title: "Cnpj",
    dataIndex: "cnpj",
  },
  {
    key: "id",
    title: "",
    dataIndex: "id",
    render: (value) => (
      <div className="flex gap-2">
        <Link href={`/establishments/${value}/edit`}>
          <a className="text-blue-600">
            <Edit size={24} />
          </a>
        </Link>
      </div>
    ),
  },
];

export const columnsIndex = [
  {
    key: "razon_social",
    title: "Razon social",
    dataIndex: "razon_social",
    render: (value, { id }) => (
      <Link href={`/establishments/${id}`}>
        <a className="text-blue-500">{value}</a>
      </Link>
    ),
  },
  {
    key: "cnpj",
    title: "Cnpj",
    dataIndex: "cnpj",
  },
  {
    key: "id",
    title: "",
    dataIndex: "id",
    render: (value) => (
      <div className="flex gap-2">
        <Link href={`/establishments/${value}`}>
          <a className="text-blue-600">
            <Eye size={24} />
          </a>
        </Link>
        <Link href={`/establishments/${value}/edit`}>
          <a className="text-blue-600">
            <Edit size={24} />
          </a>
        </Link>
      </div>
    ),
  },
];

export const columnsEstablishmentAddress = [
  {
    key: "cep",
    title: "CEP",
    dataIndex: "cep",
  },
  {
    key: "logradouro",
    title: "logradouro",
    dataIndex: "logradouro",
  },

  {
    key: "complemento",
    title: "complemento",
    dataIndex: "complemento",
  },

  {
    key: "bairro",
    title: "bairro",
    dataIndex: "bairro",
  },

  {
    key: "localidade",
    title: "localidade",
    dataIndex: "localidade",
  },

  {
    key: "uf",
    title: "uf",
    dataIndex: "uf",
  },
];
