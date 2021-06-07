const MeasurmentShape = {
    measurment: shape({
      temperature: string(),
      humidity: string(),
    }),
    timestamp: string().isRequired(),
  };
  
  const MeasurmentInsertDtoInType = oneOf([array(shape(MeasurmentShape)), shape(MeasurmentShape)]).isRequired();