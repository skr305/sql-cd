define({ "api": [
  {
    "type": "post",
    "url": "/api/v1/common/schoolbus",
    "title": "获取校车运行信息",
    "version": "0.0.1",
    "name": "Schoolbus",
    "group": "Common",
    "description": "<p>获取校车信息</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"中心校区\"",
              "\"洪家楼校区\"",
              "\"趵突泉校区\"",
              "\"软件园校区\"",
              "\"兴隆山校区\"",
              "\"千佛山校区\""
            ],
            "optional": false,
            "field": "start",
            "description": "<p>起点校区</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"中心校区\"",
              "\"洪家楼校区\"",
              "\"趵突泉校区\"",
              "\"软件园校区\"",
              "\"兴隆山校区\"",
              "\"千佛山校区\""
            ],
            "optional": false,
            "field": "end",
            "description": "<p>终点校区</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"0\"",
              "\"1\""
            ],
            "optional": false,
            "field": "isWeekend",
            "description": "<p>是否为周末 (1/0 = 是/否)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n\"start\": \"中心校区\",\n\"end\": \"软件园校区\",\n\"isWeekend\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "s",
            "description": "<p>起点</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "e",
            "description": "<p>终点</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "t",
            "description": "<p>发车时间</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "p",
            "description": "<p>经过路径</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\"code\": 0,\n\"message\": \"success\",\n\"data\": [\n{\n\"s\": \"体育馆北\",\n\"e\": \"软件园校区旗杆处\",\n\"t\": \"7:00\",\n\"p\": \"中心校区信息楼、洪家楼校区南门对面、五宿舍东北门\"\n},\n{\n\"s\": \"体育馆北\",\n\"e\": \"软件园校区旗杆处\",\n\"t\": \"9:15\",\n\"p\": \"中心校区信息楼、洪家楼校区南门对面、五宿舍东北门\"\n}\n]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/common/index.ts",
    "groupTitle": "Common"
  },
  {
    "type": "post",
    "url": "/api/v1/edu/exam_schedule",
    "title": "获取考试安排",
    "version": "0.0.1",
    "name": "ExamSchedule",
    "group": "Edu",
    "description": "<p>获取考试安排。</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Tk",
            "description": "<p>i山大系统的用户Token，通过系统登录获得</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n\"Tk\": \"33d6e504d97cf2bfa43a26c63c1e9f25\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>考试名称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "courseId",
            "description": "<p>课程号</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "courseIndex",
            "description": "<p>课序号</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "campus",
            "description": "<p>所在校区</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "time",
            "description": "<p>考试时间</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "location",
            "description": "<p>考试地点</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "method",
            "description": "<p>考试方式</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "gradeCompos",
            "description": "<p>考试方法（成绩组成）</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\"code\": 0,\n\"message\": \"success\",\n\"data\": [\n{\n\"name\": \"计算机网络\",\n\"courseId\": \"sd66666666\",\n\"courseIndex\": 2,\n\"campus\": \"软件园校区\",\n\"time\": \"2020年01月07日08:30-10:30\",\n\"location\": \"软件园五区107d\",\n\"method\": \"闭卷\",\n\"gradeCompos\": \"笔试:%,平时:%\"\n}\n]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/edu/index.ts",
    "groupTitle": "Edu"
  },
  {
    "type": "post",
    "url": "/api/v1/edu/grades",
    "title": "获取成绩",
    "version": "0.0.1",
    "name": "Grades",
    "group": "Edu",
    "description": "<p>获取本学期和历史成绩（包括不及格成绩）。按照学期降序给出。</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Tk",
            "description": "<p>i山大系统的用户Token，通过系统登录获得</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n\"Tk\": \"33d6e504d97cf2bfa43a26c63c1e9f25\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "yearTerm",
            "description": "<p>学年学期</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "courseId",
            "description": "<p>课程号</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "courseIndex",
            "description": "<p>课序号</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>课程名</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>课程类型</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "credit",
            "description": "<p>学分</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "examTime",
            "description": "<p>考试时间</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "grade",
            "description": "<p>成绩</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "gradePoint",
            "description": "<p>五分制绩点</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "gradeRank",
            "description": "<p>五分制等级</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "selected",
            "description": "<p>选课人数（可能为空）</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "rank",
            "description": "<p>排名（可能为空）</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "highestGrade",
            "description": "<p>最高成绩（可能为空）</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "lowestGrade",
            "description": "<p>最低成绩（可能为空）</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\"code\": 0,\n\"message\": \"success\",\n\"data\": {\n\"history\": [\n{\n\"gradePoint\":4.5,\n\"courseIndex\":2,\n\"gradeRank\":\"A\",\n\"type\":\"必修\",\n\"lowestGrade\":\"\",\n\"highestGrade\":\"\",\n\"grade\":\"优秀\",\n\"name\":\"数据库课程设计(双语)\",\n\"rank\":\"1\",\n\"examTime\":\"20191230\",\n\"credit\":2.0,\n\"courseId\":\"sd03030741\",\n\"yearTerm\":\"2019-2020-1\",\n\"selected\":\"70\"\n},\n{\n...\n}\n],\n\"current\": [...]\n}\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/edu/index.ts",
    "groupTitle": "Edu"
  }
] });
