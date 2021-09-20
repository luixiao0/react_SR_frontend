import axios from "axios";
export default class Userstate {
  constructor(backend_address) {
    this.backend = backend_address
    this.Auth = localStorage.getItem("Auth")
    this.uid = localStorage.getItem("uid")
    this.http = axios.create({
      baseURL: this.backend,
      headers: {
        "Content-type": "application/json",
      },
    });

    if (this.uid === null) {
      this.reg()
    }
    else {
      this.get_token()
    }
    setInterval(this.get_token, 1000 * 60 * 5)
  }

  reg = () => {
    this.http.post("/reg", null, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    }
    ).then(res => res.data).then(data => {
      if (data) {
        this.uid = data
        localStorage.setItem("uid", this.uid)
      }
    })
      .finally(() => {
        this.get_token()
      })
      .catch(error => alert(error))
  }

  get_token = () => {
    this.http.post("/token?uid=" + this.uid, null, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    }
    ).then(res => {
      if (res.status === 200) {
        return res.data
      }
      else {
        alert("server failed(no token)")
        this.logout()
      }
    }).then(data => {
      if (data.access_token) {
        this.Auth = data.token_type + " " + data.access_token
        localStorage.setItem("Auth", this.Auth)
      }
    }).catch(error => {
      // console.log(error, "logerr");
      if (error.response) {
        if (Number(error.response.status) === 401) { this.reg() }
      }
    })
  }

  DelTask = (taskid, s) => {
    console.log(taskid, "del")
    this.http.post("/deltask?taskid=" + String(taskid), null, {
      headers: {
        "accept": "application/json",
        "Authorization": this.Auth
      },
    }
    ).then(res => {
      // s()
      console.log(res)
    }).catch((e) => console.log(e))
  }

  DlTask = (taskid, s) => {
    this.http.post("/dload?taskid=" + String(taskid), null, {
      responseType: "blob",
      headers: {
        "Accept": "application/json",
        "Authorization": this.Auth,
      },
      onDownloadProgress: (event) => {
        const totalLength = event.lengthComputable ? event.total : event.target.getResponseHeader('content-length') || event.target.getResponseHeader('x-decompressed-content-length');
        console.log(event)
        if (totalLength !== null) {
          let progress = Math.round((event.loaded * 99) / totalLength);
          s(progress)
        }
      }
    }).then(res => { if (res.status === 200) { return res } })
      .then(res => {
        let a = document.createElement("a");
        let url = window.URL.createObjectURL(res.data);
        let filename = res.headers["content-disposition"].match(/filename\s*=\s*"(.+)"/i)[1];
        if (filename) {
          a.href = url;
          a.download = filename; //给下载下来的文件起个名字
          a.click();
          window.URL.revokeObjectURL(url);
        }
        s()
      })
  }

  get_tasks = (setter) => {
    this.http.post("/me/tasks/", null, {
      headers: {
        "Accept": "application/json",
        "Authorization": this.Auth
      }
    }).then(res => {
      if (res.status === 200) {
        return res.data
      }
      else {
        console.log("server failed(no task)")
      }
    }).then(res => {
      // setter(res)
      // let TasksList = []
      // if (!res.detail) {
      //     res.forEach((value, index) => {
      //         const curtask = value
      //         if (curtask !== null) {
      //             TasksList.push(curtask)
      //         }
      //     })
      // }
      // console.log(res)
      setter(res)
    }).catch(error => console.log("fetch err"))
  }

  get_preview = (taskid, setter) => {
    this.http.get("/preview/" + taskid, {
      responseType: "blob",
      headers: {
        "Accept": "application/json",
        "Authorization": this.Auth
      }
    }).then((response) => {
      return response.data;
    }).then((myBlob) => {
      let objectURL = URL.createObjectURL(myBlob);
      setter(objectURL);
    });
  }


  newTask = (task, SRvar, setter) => {
    let formData = new FormData()
    formData.append("files", task);
    this.http.post("/me/newtask/?args=" + JSON.stringify(SRvar),
      formData,
      {
        headers: {
          "Accept": "application/json",
          "Authorization": this.Auth
        },
        onUploadProgress: (event) => {
          const totalLength = event.lengthComputable ? event.total : event.target.getResponseHeader('content-length') || event.target.getResponseHeader('x-decompressed-content-length');
          // console.log(event)
          if (totalLength !== null) {
            let progress = Math.round((event.loaded * 99) / totalLength);
            setter(progress)
          }
        }
      })
      .then(response => {
        if (response.status === 200) {
          if (response.data) {
            response.data.forEach((value) => {
              if (value.taskid === null) {
                setter(-1)
              }
              else {
                console.log(value.taskid, "taskid")
              }
            })
          }
        }
        setter(100)
      })
      .catch(error => {
        console.error(error)
      })
  }

  logout = () => {
    this.Auth = ""
    this.uid = ""
    localStorage.clear();
  }

  onChange = (event, s) => {
    let uid = event.target.value
    // console.log(uid)
    if (String(uid).length === String(this.uid).length) {
      this.uid = uid
      s()
      this.get_token()
    }
  }

}
