function mapPutResult(resultArray) {
  const resultObj = {
    success: [],
    fail: [],
  };

  resultArray.forEach((result) => {
    if (result.hasOwnProperty('Success')) {
      resultObj.success.push({ userId: result.Success });
    } else {
      resultObj.fail.push(result.Fail);
    }
  });

  return resultObj;
}

module.exports = {
  mapPutResult,
};
