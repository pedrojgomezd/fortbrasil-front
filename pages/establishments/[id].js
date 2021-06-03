import { useCallback, useEffect, useState } from "react";
import { clientHttp } from "../../services/clientHttp";
import Layouts from "../../src/Layouts";
import Table from "../../src/Table";
import {
  columnsEstablishmentAddress,
  columnsEstablishments,
} from "../../src/pages/establishments/tableStructure";
import { useRouter } from "next/router";

const EstablishmentsDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(false);

  const [establishment, setEstablishment] = useState([]);

  const fetchEstablishment = useCallback(async () => {
    setLoading(true);
    const { data } = await clientHttp.get(`establishments/${id}`);
    setEstablishment(data);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    if (id >= 1 && id !== undefined) {
      fetchEstablishment();
    }

    return () => true;
  }, [id]);
  const address = establishment?.address;
  return (
    <Layouts title="Establishment" {...{ loading }}>
      <div>
        <h3 className="text-2xl text-gray-700 font-semibold">
          establishment: {establishment.razon_social}
        </h3>
      </div>
      <div className="flex ">
        <div className="w-full">
          <Table dataSource={[establishment]} columns={columnsEstablishments} />
          {address && (
            <Table
              dataSource={[address]}
              columns={columnsEstablishmentAddress}
            />
          )}
        </div>
      </div>
    </Layouts>
  );
};

export default EstablishmentsDetailsPage;
