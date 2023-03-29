
class APIFeatures {
    constructor(query,queryString) {
        this.query = query;
        this.queryString = queryString;
        
    }

    filter() {
        const queryObj = {...this.queryString};
        const excludeFields = ['page', 'sort', 'limit', 'fields'];
         excludeFields.forEach(el => delete queryObj[el]); 
         //deletes the elements specified in the array from the incoming query string 
        
         
         
         //ADVANCED FILTERING
         let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`); 
     this.query = this.query.find(JSON.parse(queryStr));
         // (gte|gt|lte|lt) regular expression to find any of the 'gte,gt,lte,lt' 
         //For ex: if there is any word containing 'lt','lte','gte','gt', we don't want that to get filtered but only the specified ones, for this (\b \b) is used
         // there maybe multiple times of the occurrance for this '/g' operator is used  
         return this;
   

    }
  sort() {
    if(this.queryString.sort){
            
        const sortBy = this.queryString.sort.split(',').join(' '); //sorting by taking two fields if there are any with same data
       this.query = this.query.sort(sortBy);    
  }
  else{
   this.query =this.query.sort('-createdAt');
  }
  return this;
}

limitFields() {
    if(this.queryString.fields){
        const fields = this.queryString.fields.split(',').join(' ');
       this.query = this.query.select(fields); //in fields the data we specify in the query is present and selecting that data only

     }
     else{
        this.query = this.query.select('-__v');  // the '-_v' will get excluded from the output data
     }
     return this;
}
paginate()
{
    const page = this.queryString.page*1|| 1; //converting page from url to number and providing a default value for no. of pages
    const limit = this.queryString.limit*1|| 100;  //...  providing a default value for no. results per page
    const skip = (page-1)*limit;  //imiting the results to a specific number by skipping the results from previous pages
    this.query = this.query.skip(skip).limit(limit); 
    return this;
       
}
}
module.exports = APIFeatures;