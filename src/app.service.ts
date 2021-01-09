import { Injectable,Logger } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
import * as xlsx from 'node-xlsx';
import * as fs from 'fs';
@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  constructor(){
    this.getData()
  }
  async getData(){
    const url = 'http://quotes.money.163.com/f10/zycwzb_600519.html#01c01';
    const res = await axios.get(url);
    let $ = cheerio.load(res.data);
    let tableTitle = [];
    const dbrow = $('.dbrow').find('th');
    $(dbrow).each(function(){
      tableTitle.push($(this).text())
    });
    tableTitle.shift();
    const row = $('.scr_table').find('tr')[11];
    const row_th = $(row).find('td')
    const _data = []
    $(row_th).each(function(i,elem){
        _data.push($(this).text())
      
      
    })
    
    let xldata = [
      {
        name:"茅台净利润",
        data:[
          tableTitle,_data
        ]
      }
    ]
    
    fs.writeFile('./maotai.xlsx',xlsx.build(xldata),function(err){
      if(err){
        console.log(err)
      }
    });
    // return;
  }
  getHello(): string {
    return 'Hello World!';
  }
}
