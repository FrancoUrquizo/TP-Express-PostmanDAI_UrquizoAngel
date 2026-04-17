class ValidacionesHelper {

  getIntegerOrDefault = (value, defaultValue) => { 

   const parsedValue = parseInt(value, 10); 
    if (Number.isNaN(parsedValue)) {
      return defaultValue;
    }
    return parsedValue; 
    
     };



  getStringOrDefault = (value, defaultValue) => {
   
    if (value === null || value === undefined) {
      return defaultValue;
    }  
    const parsedString = String(value).trim(); 
    if (parsedString === '') {
      return defaultValue;
    }
    return parsedString;
  };

  getDateOrDefault    = (value, defaultValue) => { 
    if(value === null || value === undefined){
        return defaultValue
    }
    const parseDate = new Date (value)
    if (Number.isNaN(parsedDate.getTime())) {
      return defaultValue;
    }
     return parseDate
        
   };


  getBooleanOrDefault = (value, defaultValue) => { 

  if (typeof value === 'boolean') {
      return value;
    }
    if (typeof value === 'string'){
     const normalizedValue = value.trim().toLowerCase();
    
     if (normalizedValue === 'true') {
        return true;
      }
      if (normalizedValue === 'false') {
        return false;
      }
    }
    return defaultValue


   };
  isEmail = (value) => { 
    if (typeof value !== 'string') {
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);

   };

}export default new ValidacionesHelper();