/* eslint-disable */
export default {
    pages: 10,
    pageSize: [10, 20, 30], // [20, 30, 50]
    status: 200,
    zipType: {
      zip: true,
      rar: true
    },
    excelType: {
      xls: true,
      xlsx: true
    },
    docType: {
      doc: true,
      docx: true
    },
    pdfType: {
      pdf: true,
      PDF: true
    },
    fileType: {
      pdf: true,
      PDF: true,
      jpg: true,
      jpeg: true,
      png: true,
      gif: true
    },
    imgType: {
      'image/jpg': true,
      'image/jpeg': true,
      'image/bmp': true,
      'image/png': true,
      'image/gif': true,
      'image/psd': true
    },
    fmoney: function (s, n) {
      var negative = false
      n = n > 0 && n <= 20 ? n : 2
      Number(s).toFixed(n)
      if (Number(s) < 0) {
        negative = true
        s = Math.abs(s)
      }
      s = parseFloat((s + '').replace(/[^\d\.-]/g, '')).toFixed(n) + ''
      let l = s.split('.')[0].split('').reverse()
      let r = s.split('.')[1]
      let t = ''
      for (let i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? ',' : '')
      }
      if (s === 0 || s === '0') {
        t += '.00'
        return t
      } else {
        if (!r) {
          r = ''
          for (var i = 0; i < n.length; i++) {
            r = r + '0'
          }
        }
        let sT = t.split('').reverse().join('') + '.' + r
        if (sT[1] === ',' && sT[0] === '-') {
          let arr = sT.split(sT[1])
          t = arr[0] + arr[1]
        } else {
          t = sT
        }
        if (negative) {
          t = '-' + t
        }
        return t
      }
    },
    handleSetTime (time) {
        if (time && (time.indexOf(' ') > -1)) {
          return time.split(' ')[0]
        } else if (time && (time.indexOf('T') > -1)) {
          return time.split('T')[0]
        } else {
          return time
        }
      },
    timeTransfer (value) {
      if (value === '' || value === undefined) return ''
      let values = new Date(value)
      var year = values.getFullYear()
      var month = values.getMonth() + 1
      if (month < 10) {
        month = '0' + month
      }
      var date = values.getDate()
      if (date < 10) {
        date = '0' + date
      }
      return year + '-' + month + '-' + date
    },
    handleTimeTrans (val) { // 时间格式转时间戳
      if (val === '' || val === undefined) return ''
      let date = new Date(val.replace(/-/g, '/')).getTime()
      return date
    },
    businessTypes: {
      FIRST_GOODS_AFTER_MONEY:'先货后款',
      FIRST_MONEY_AFTER_GOODS:'先款后货',
      FIRST_GOODS_AFTER_MONEY_PLEDGE_PURCHASE:'先货后款质押采购',
      FIRST_MONEY_AFTER_GOODS_PLEDGE_PURCHASE:'先款后或质押销售'
    },
    cTypes: {
      SALE:'销售合同',
      PURCHASE:'采购合同',
      SALE_SINGLE_PARTY:'单方提交销售合同',
      PURCHASE_SINGLE_PARTY:'单方提交采购合同',
      SELLING:'采购订单',
      PURCHASE:'销售订单'
    }
  }
  