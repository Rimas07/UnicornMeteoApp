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
  code: code(),
  name: string(200),
  location: gps(),
  locationDesc: string(200),
  timezone: string(100).isRequired(),
 
});

const GatewayUpdateDtoInType = shape({
  id: id().isRequired(),
  name: string(200),
  location: gps(),
  locationDesc: string(200),
  timezone: string(100),
  code: code(),
  uuEe: uuIdentity(),
  state: oneOf(["active", "closed"])
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
