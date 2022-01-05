function addMenu() {
  let ui = SpreadsheetApp.getUi(); 
  ui.createMenu("CS Tools")
    .addItem("Show Reps", "showReps")
    .addToUi(); 
}

function showReps() {
  let ss = SpreadsheetApp.getActiveSpreadsheet(); 
  let sheet = ss.getActiveSheet(); 
  let lastRow = sheet.getLastRow(); 
  let lastCol = sheet.getLastColumn(); 
  let repRange = sheet.getRange(1,2,lastRow); 
  let row = repRange.getRow(); 
  let col = repRange.getColumn(); 

  if (sheet.isColumnHiddenByUser(2) == true) {
    sheet.showColumns(1,2); 
    sheet.getRange(1,1, lastRow).activate(); 
    
  } else {
    sheet.hideColumns(1,2); 
  }; 
}
