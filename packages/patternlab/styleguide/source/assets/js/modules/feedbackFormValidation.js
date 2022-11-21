 export const filtersCore = [
  {
    name: "phone",
    re: /(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/i
    /* 
      1234567890
      123-456-7890
      (123) 456-7890
      123 456 7890
      123.456.7890
      +91 (123) 456-7890
    */
  },
  {
    name: "email",
    re: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/i
  },
  {
    name: "ssn",
    re: /\b\d{3}[-]?\d{2}[-]?\d{4}\b/i
    /* 
      XXX-XX-XXXX
      XXXXXXXXX
    */
  },
  {
    name: "driver",
    re: /\b([A-Z]{1}[0-9]{8})|([A-Z]{2}[0-9]{7})|([0-9]{9})\b/i
    /* 
      https://ntsi.com/drivers-license-format/ 
      https://github.com/adambullmer/USDLRegex/blob/master/regex.json
      MA driver's license
          "1 Alpha + 8 Numeric",
          "2 Alpha + 7 Numeric",
          "9 Numeric"
    */
  }
]


export const filtersOptional = [
  {
    name: "date",
    re: /(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-](?!22|23|2022|2023)([\d]{2,4})|((Jan(|uary)|Feb(|ruary)|Mar(|ch)|Apr(|il)|May|Jun(|e)|Jul(|y)|Aug(|ust)|Sept(|ember)|Oct(|ober)|(Nov|Dec)(|ember))([\s\-])((0?[1-9]|[12][0-9]|3[01])([\s\-]|\,[\s]?))(?!2022|2023)([\d]+){4})/i
    /* 
      dd/mm/yyyy
      d/m/yyyy
      d/m/yy
      dd-mm-yyyy
      d-m-yyyy
      d-m-yy
      Jan 1 2021
      Jan 01 2021
      January 1 2021
      January 01 2021
      January 01, 2021
      January 01,2021
    */
  },
  {
    name: "digits",
    re: /[0-9]{5}/i
    /*
      At least 5 sequential numbers
      - This includes zipcode
      - Results do not exclude other patterns
      - If we are looking for license, some key words to consider: license #, license#, license number
    */
  },
  {
    name: "keyword",
    re: /asap|help me/i
  }
];