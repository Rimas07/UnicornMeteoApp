
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






const measurementShape = {
  measurement: shape({
    temperature: string(),
    humidity: string(),
  }),
  timestamp: string().isRequired(),
};
  
  const MeasurementEnterDtoInType = oneOf([array(shape(measurementShape)), shape(measurementShape)]).isRequired();

  
  const MeasurementGetDtoInType = shape({
    GatewayId: string().isRequired(),
    period: integer(1, 60).isRequired(),
    units: oneOf(['minute', 'hour', 'day']).isRequired(),
    interval: integer(30, 24 * 60 * 60),
  });