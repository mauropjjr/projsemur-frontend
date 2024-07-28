export class ObjectHandler {
    static removeEmptyValues(obj: any): any {
      if (!obj || typeof obj !== 'object') {
        return obj;
      }
  
      Object.keys(obj).forEach((key) => {
        if (obj[key] === null || obj[key] === undefined || obj[key] === '') {
          delete obj[key];
        } else if (typeof obj[key] === 'object') {
          ObjectHandler.removeEmptyValues(obj[key]);
          if (Object.keys(obj[key]).length === 0) {
            delete obj[key];
          }
        }
      });
  
      return obj;
    }
  }
  