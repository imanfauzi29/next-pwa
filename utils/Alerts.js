import Swal from "sweetalert2"
import t from "../translator/helper"
import Utils from "./Utils"

export default class Alerts {
  static reloadPageWithMessage(message, lang) {
    
    Swal.fire({
      title: message,
      confirmButtonText: t("dialog:OK", lang),
      customClass: {
        confirmButton: "btn__sm w-84 text-center btn-default"
    },
      icon: "success",
    }).then((r) => {
      window.location.reload()
    })
  }

  static showError(message, lang) {
    
    Swal.fire({
      title: message,
      confirmButtonText: t("dialog:OK", lang),
      customClass: {
        confirmButton: "btn__sm w-84 text-center btn-default"
    },
      icon: "error",
    }).then((r) => {})
  }

  static showWarningWithReloadPage(message, lang) {
    
    Swal.fire({
      title: message,
      confirmButtonText: t("dialog:OK", lang),
      customClass: {
        confirmButton: "btn__sm w-84 text-center btn-default"
    },
      icon: "warning",
    }).then((r) => {
      window.location.reload()
    })
  }

  static messageConfirmationDelete(language, row = '') {
    return `${t("dialog:Do you really want to delete", language)} <b>${row}</b>?<br/>${t("dialog:This process cannot be undone", language)}`
  }

  static withUserConfirmation(message, onConfirmed, language, type = 'delete', title = 'Are You Sure ?') {
      Swal.fire({
          title: t(`dialog:${title}`, language),
          html: message,
          confirmButtonText: t(`dialog:${this.typeConfirmation(type).confirmButtonText}`, language),
          showCancelButton: true,
          cancelButtonText: `${t("dialog:Cancel", language)}`,
          customClass: {
              cancelButton: "btn__sm w__100 bg-light-grey btn-default",
              confirmButton: `btn-default btn__sm w__100 ${this.typeConfirmation(type).confirmButtonColor}`
          },
          icon: this.typeConfirmation(type).icon,
      }).then((result) => {
          if (result.isConfirmed) {
              onConfirmed()
          }
      })
  }

  static typeConfirmation(type) {
    switch (type) {
      case 'success':
        return {
          icon: type,
          confirmButtonColor: 'bg-light-primary',
          confirmButtonText: 'Yes'
        }
        break

      case 'warning':
        return {
          icon:  type,
          confirmButtonColor: 'bg-light-warning',
          confirmButtonText: 'Yes'
        }
        break
      
      case 'info': 
        return {
          icon: type,
          confirmButtonColor: 'bg-light-info',
          confirmButtonText: 'Yes'
        }
        break 

      case 'question':
        return {
          icon: type,
          confirmButtonColor: 'bg-light-primary',
          confirmButtonText: 'Yes'
        }

      default:
        return {
          icon: 'error',
          confirmButtonColor: 'bg-light-red',
          confirmButtonText: 'Delete'
        }
        break
    }
  }

  static confirmWithLoadingData() {
    const ipAPI = '//api.ipify.org?format=json'
    Swal.queue([{
      title: 'Request Task',
      confirmButtonText: 'Yes',
      text:
        'Do You Want to Request New Task ? ',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return fetch(ipAPI)
          .then(response => response.json())
          .then(data => Swal.insertQueueStep(data.ip))
          .catch(() => {
            Swal.insertQueueStep({
              icon: 'error',
              title: 'Unable to get your public IP'
            })
          })
      }
    }])
  }
}
