import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import * as camelcase from 'camelcase';
import { ObjectTypes, SqlTypes } from './models/enums';
import { SQL2ObjectFormData } from './models/object.model';
import { NotifyService } from './services/notify.service';
import { ResultTypeService } from './services/result-type.service';
import { StoreProcedureTypeService } from './services/store-procedure-type.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  sqlTypes: string[] = [
    'Result',
    'Stored Procedure'
  ]

  objectTypes: string[] = [
    'C#',
    'TypeScript',
    'Swift'
  ]

  form: FormGroup = new FormGroup({})
  generatedObject = new FormControl({ objectType: null, content: null })

  constructor(
    private fb: FormBuilder,
    private resultTypeService: ResultTypeService,
    private storedProcedureTypeService: StoreProcedureTypeService,
    private title: Title,
    private notify: NotifyService
  ) { }

  ngOnInit() {
    this.title.setTitle('sql2object | A developer tool')
    this.form = this.fb.group({
      sqlType: [SqlTypes.Result, Validators.required],
      objectType: ['C#', Validators.required],
      sqlTextData: ['', Validators.required],
      isLowerCamelCase: [false]
    })
  }

  processSqlData() {
    const form: SQL2ObjectFormData = this.form.value
    const rows = form.sqlTextData.split('\n')

    switch (form.sqlType) {
      case SqlTypes.Result:
        try {
          const rowsWithProps = rows.map(r => r.split('\t'))

          const propNames = rowsWithProps[0]
          const propValues = rowsWithProps[1]

          const propsWithDataTypes = propNames.map((propName, index) => ({
            propName: form.isLowerCamelCase ? this.convertToLowerCamelCase(propName) : propName,
            propDataType: this.getResultDataType(form.objectType, propName, propValues[index])
          }))

          this.generatedObject.setValue({ objectType: form.objectType, content: propsWithDataTypes })
          this.notify.thankYouMessage()
          break
        } catch (error) {
          console.error('**SQL Type = Result**', error)
          this.notify.sqlTypeMessage('Result')
          break
        }
      case SqlTypes.StoredProcedure:
        try {
          const mappedParameters = rows.map(r => {
            const splitParameter = r.split(' ')
            // removes empty spaces
            const removedEmptySpaces = splitParameter.filter(p => p)
            return {
              parameterName: removedEmptySpaces[0].replace('@', '').trim(),
              parameterDataType: removedEmptySpaces[1]
            }
          })

          const parametersWithDataTypes = mappedParameters.map(parameter => ({
            propName: form.isLowerCamelCase ? this.convertToLowerCamelCase(parameter.parameterName) : parameter.parameterName,
            propDataType: this.getStoreProcedureDataType(form.objectType, parameter.parameterDataType)
          }))

          this.generatedObject.setValue({ objectType: form.objectType, content: parametersWithDataTypes })
          this.notify.thankYouMessage()
          break;
        } catch (error) {
          console.error('**SQL Type = Stored Procedure**', error)
          this.notify.sqlTypeMessage('Stored Procedure')
          break
        }
      default:
        this.generatedObject.setValue({ objectType: null, content: null })
    }
  }

  convertToLowerCamelCase(propName: string) {
    return camelcase(propName)
  }

  getResultDataType(objectType: string, propName: string, value: string): string {
    switch (objectType) {
      case ObjectTypes.CSharp:
        return this.resultTypeService.getCSharpDataType(propName, value)
      case ObjectTypes.TypeScript:
        return this.resultTypeService.getTypeScriptDataType(propName, value)
      case ObjectTypes.Swift:
        return this.resultTypeService.getSwiftDataType(propName, value)
      default:
        return ''
    }
  }

  getStoreProcedureDataType(objectType: string, value: string) {
    switch (objectType) {
      case ObjectTypes.CSharp:
        return this.storedProcedureTypeService.getCSharpDataType(value)
      case ObjectTypes.TypeScript:
        return this.storedProcedureTypeService.getTypeScriptDataType(value)
      case ObjectTypes.Swift:
        return this.storedProcedureTypeService.getSwiftDataType(value)
      default:
        return ''
    }
  }

  copyObject() {
    const objectData = document.getElementById('copy-content')?.innerText
    navigator.clipboard.writeText(<string>objectData).then(function () {
      console.log('Async: Copying to clipboard was successful!');
    }, function (err) {
      console.error('Async: Could not copy text: ', err);
    });
  }
}