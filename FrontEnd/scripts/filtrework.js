
/*  filtrage des travaux*/
export function filtreWork(works,idselect) {
  const idselectnumber=parseInt(idselect); 
  if (idselectnumber===4){ 
    return works;
  }else{
    let filteredworks = works.filter(work => (work.categoryId===idselectnumber));
    return filteredworks;
  }
}