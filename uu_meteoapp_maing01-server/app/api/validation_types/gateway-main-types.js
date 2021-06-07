/* eslint-disable */

const initDtoInType = shape({
  uuAppProfileAuthorities: uri().isRequired("uuBtLocationUri"),
  uuBtLocationUri: uri(),
  name: uu5String(512),
  sysState: oneOf(["active", "restricted", "readOnly"]),
  adviceNote: shape({
    message: uu5String().isRequired(),
    severity: oneOf(["debug", "info", "warning", "error", "fatal"]),
    estimatedEndTime: datetime(),
  }),
});

const GatewayCreateDtoInType = shape({
 
  name: string(200),
  location: gps(),
  city: string(200),
  district: string(200),
});

const GatewayDeleteDtoInType = shape({
  id: oneOf([array(string()), string()]).isRequired(),
})
const gatewayGetDtoInType = shape({
  id: id().isRequired(["code", "uuEe"]),
  code: code().isRequired(["id", "uuEe"]),
})
const GatewayListDtoInType = shape({
  pageInfo: shape({
    pageIndex: integer(0, null),
    pageSize: integer(1, 100),
  }),
});
