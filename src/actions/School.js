import request from 'superagent';

// constants to be used for getSchools API call
const baseUrl = 'https://api.data.gov/ed/collegescorecard/v1/schools.json?';
const fields = "&_fields=id,school.name,school.state,2015.cost.avg_net_price.overall,2015.student.grad_students,2015.cost.tuition.in_state,2015.cost.tuition.out_of_state,2015.cost.tuition.program_year,school.state_fips,school.locale,school.degrees_awarded.predominant,school.degrees_awarded.highest,2015.cost.attendance.academic_year,2015.student.size,2015.academics.program_available.bachelors,2015.academics.program_available.assoc,2015.admissions.admission_rate.overall,school.ownership,school.school_url"
const sortItems  = "&sort=2015.cost.avg_net_price.overall:desc";
const perPage = "&_per_page=100";

// get the ley from the command line entry to be used for API call
function generateCredentials(){
  let publicKey = process.env.REACT_APP_API_PUBLIC_KEY;

  return publicKey;
}

// function that does the actual API call to get the list of colleges based on user preferences
export function getSchools(stateFilter = "",programFilter = ""){
  
  // initialize some variables to be used in search string for API call
  let search = "";
  let stateSearch = "";
  let programSearch = "";
  let costSearch = "";

  // used to filter the API call based on list of states in user preferences
  if(stateFilter){
    stateSearch = "school.state="+ stateFilter;
  }
  // used to filter the API call based on choice of Major in user preferences
  if(programFilter){
    programSearch = "&2015.academics.program.degree."+programFilter+"=1";
  }

  //  build search string for API call with state and program/major filters
  search=stateSearch+programSearch;
  
  return dispatch => {
    request.get(`${baseUrl}${search}${fields}${sortItems}${perPage}&api_key=${generateCredentials()}`).end(
      (error, response) => {
        if(!error) {
          // succuessful API call, so we can trigger a state change on schools
          dispatch({ type: `SEARCHED_SCHOOLS`, schools: response.body.results });
        }
      }
    );
  };
}

// function to make API call and update school details object to present in School Details component
export function schoolDetails(schoolID){
    
    // initialize some variables to be used for API call
    
    let search = "id=" + schoolID;

    let baseUrl: string = 'https://api.data.gov/ed/collegescorecard/v1/schools.json?';
    let fields: string = "&_fields=school.name,school.ownership,school.city,school.state,school.school_url,school.price_calculator_url,school.state_fips,school.locale,school.degrees_awarded.predominant,school.degrees_awarded.highest,2015.cost.avg_net_price.public,2015.cost.avg_net_price.private,2015.cost.avg_net_price.overall,2015.cost.tuition.in_state,2015.cost.tuition.out_of_state,2015.cost.tuition.program_year,2015.cost.attendance.academic_year,2015.student.size,2015.academics.program_available.bachelors,2015.academics.program_available.assoc,2015.admissions.admission_rate.overall,2015.aid.federal_loan_rate,2015.aid.loan_principal,2015.aid.pell_grant_rate,2015.aid.median_debt.completers.overall,2015.aid.median_debt.noncompleters,2015.student.retention_rate.four_year.full_time,2015.completion.completion_rate_4yr_150nt,2015.student.demographics.men,2015.student.demographics.women,2015.student.demographics.median_family_income,2015.student.grad_students,2015.completion.title_iv.completed_by.4yrs,2015.admissions.sat_scores.average.overall,2015.cost.net_price.private.by_income_level.0-30000,2015.cost.net_price.private.by_income_level.30001-48000,2015.cost.net_price.private.by_income_level.48001-75000,2015.cost.net_price.private.by_income_level.75001-110000,2015.cost.net_price.private.by_income_level.110001-plus,2015.cost.net_price.public.by_income_level.0-30000,2015.cost.net_price.public.by_income_level.30001-48000,2015.cost.net_price.public.by_income_level.48001-75000,2015.cost.net_price.public.by_income_level.75001-110000,2015.cost.net_price.public.by_income_level.110001-plus"
    
    
    
    return dispatch => {
      request.get(`${baseUrl}${search}${fields}&api_key=${generateCredentials()}`).end(
        (error, response) => {
          if(!error) {
            // succuessful API call, so we can trigger a state change on schooldetails
            dispatch({ type: `SCHOOL_DETAILS`, schooldetails: response.body.results });
          }
        }
      );
    };
  }

  