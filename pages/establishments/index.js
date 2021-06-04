import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { clientHttp } from "../../services/clientHttp";
import Button from "../../src/common/Button";
import IconElement from "../../src/common/IconElement";
import Layouts from "../../src/Layouts";
import { columnsIndex } from "../../src/pages/establishments/tableStructure";
import SearchInput from "../../src/search/SearchInput";
import Table from "../../src/Table";

const EstablishmentsPage = () => {
  const [loading, setLoading] = useState(true);
  const [establishments, setEstablishments] = useState([]);
  const { query, push } = useRouter();
  const { q } = query;

  const searchByCity = useCallback(() => {}, [q]);

  const fetchEstablishments = () => {
    clientHttp
      .get("establishments")
      .then(({ data }) => {
        setEstablishments(data);
        setLoading(false);
      })
      .catch(() => alert("error"));
  };
  useEffect(() => {
    fetchEstablishments();
  }, []);

  useEffect(() => {
    const seearchEstablishments = () => {
      setLoading(true);
      clientHttp
        .get(`search/${q}`)
        .then(({ data }) => {
          setEstablishments(data);
          setLoading(false);
        })
        .catch(() => alert("error"));
    };
    q !== undefined ? seearchEstablishments() : fetchEstablishments();
    console.log(q);
  }, [q]);

  return (
    <Layouts
      title="Customer"
      {...{ loading }}
      searchComponent={<SearchInput onChange={(q) => push(`?q=${q}`)} />}
    >
      <div className="flex justify-between w-full items-center">
        <h3 className="text-2xl text-gray-700 font-semibold flex gap-2 items-center">
          <IconElement icon="User" />
          Establishments
        </h3>
        <div>
          <Link href="/establishments/create">
            <a>
              <Button label="Add" icon="Plus" variant="primary" />
            </a>
          </Link>
        </div>
      </div>
      <Table dataSource={establishments} columns={columnsIndex} />
    </Layouts>
  );
};

export default EstablishmentsPage;
