const checkMillionDollarIdea = (idea) => {

    const value = idea.numWeeks + idea.weeklyRevenue;
    
    if (value > 1e6){
        return value;
    }

};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
