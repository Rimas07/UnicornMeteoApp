const MeasurmentShape = {
  measurment: shape({
    temperature: string(),  
    humidity: string(),
  }),
  timestamp: string().isRequired(),
};

const MeasurmentCreateDtoInType = oneOf([array(shape(MeasurmentShape)), shape(MeasurmentShape)]).isRequired();