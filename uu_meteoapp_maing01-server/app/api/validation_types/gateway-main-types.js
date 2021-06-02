/* eslint-disable */

const initDtoInType = shape({
    uuAppProfileAuthorities: uri().isRequired("uuBtLocationUri"),
    uuBtLocationUri: uri(),
    name: uu5String(512),
    sysState: oneOf(["active","restricted","readOnly"]),
    adviceNote: shape({
      message: uu5String().isRequired(),
      severity: oneOf(["debug", "info", "warning", "error", "fatal"]),
      estimatedEndTime: datetime(),
    }),
  });
  
  const GatewayCreateDtoInType = shape({
    name: uu5String(255).isRequired(),
    text: uu5String(4000)
  });

  const GatewayListDtoInType = shape({
    pageInfo: shape({
      pageIndex: integer(),
      pageSize: integer()
    })
  });