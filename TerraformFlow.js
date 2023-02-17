require('dotenv').config();
const fs = require('fs');
const { toUnicode } = require('punycode');

let flow = JSON.parse(fs.readFileSync(process.argv.slice(2)[0], 'utf8'));
let newFlow = JSON.parse(fs.readFileSync(process.argv.slice(2)[0], 'utf8'));
let say_play = [];
let set_variables = [];
let split_based_on = [];
let send_to_flex = [];
let add_twiml_redirect = [];
let run_function = [];
let run_subflow = [];
let connect_call_to = [];
let record_voicemail = [];
let record_call = [];
let fork_stream = [];
let connect_virtual_agent = [];
let send_message = [];
let send_to_auto_pilot = [];
let updateNext = [];
let connect_virtual_agent_v2 = [];
let make_outgoing_call_v2 = [];
let run_model_inference = [];
let alert;
let url, workflow, channel, attributes, play;
let functionTemplate = "";
let promptTemplate = "";
let twimlTemplate = "";
let queuesTemplate = "";
let splitTemplate = "";
let variablesTemplate = "";
let subflowTemplate = "";
let connectTemplate = "";
let voicemailTemplate = "";
let recordCallTemplate = "";
let streamTemplate = "";
let virtualAgentTemplate = "";
let virtualAgentV2Template = "";
let sendMessageTemplate = "";
let autoPilotTemplate = "";
let makeOutgoingCallV2Template = "";
let runModelInferenceTemplate = "";


for (let i = 0; i < flow.states.length; i++) {
  let updateNextData = {};
  let data = {}
  let name = flow.states[i].name + "Name"
  data[name] = flow.states[i].name
  console.log("Working on contact flow block", i)


  switch (flow.states[i].type) {
    case "trigger":
      break;
    case "set-variables":
      set_variables.push(data)
      newFlow.states[i].name = "${var.studio_variables." + flow.states[i].name + "Name}"
      updateNextData[flow.states[i].name] = "${var.studio_variables." + flow.states[i].name + "Name}"
      updateNext.push(updateNextData)
      break;
    case "split-based-on":
      split_based_on.push(data)
      newFlow.states[i].name = "${var.studio_split." + flow.states[i].name + "Name}"
      updateNextData[flow.states[i].name] = "${var.studio_split." + flow.states[i].name + "Name}"
      updateNext.push(updateNextData)
      break;
    case "say-play":
      newFlow.states[i].name = "${var.studio_prompts." + flow.states[i].name + "Name}"
      updateNextData[flow.states[i].name] = "${var.studio_prompts." + flow.states[i].name + "Name}"
      updateNext.push(updateNextData)
      if (flow.states[i].properties.play) {
        play = flow.states[i].name + "Play"
        data[play] = flow.states[i].properties.play
        newFlow.states[i].properties.play = "${var.studio_prompts." + flow.states[i].name + "Play}"
      } else {
        play = flow.states[i].name + "Say"
        data[play] = flow.states[i].properties.say
        newFlow.states[i].properties.say = "${var.studio_prompts." + flow.states[i].name + "Say}"
        if (flow.states[i].properties.voice) {
          voice = flow.states[i].name + "Voice"
          data[voice] = flow.states[i].properties.voice
          newFlow.states[i].properties.voice = "${var.studio_prompts." + flow.states[i].name + "Voice}"
        }
        if (flow.states[i].properties.language) {
          language = flow.states[i].name + "Language"
          data[language] = flow.states[i].properties.language
          newFlow.states[i].properties.language = "${var.studio_prompts." + flow.states[i].name + "Language}"
        }
      }
      say_play.push(data)
      break;
    case "gather-input-on-call":
      newFlow.states[i].name = "${var.studio_prompts." + flow.states[i].name + "Name}"
      updateNextData[flow.states[i].name] = "${var.studio_prompts." + flow.states[i].name + "Name}"
      updateNext.push(updateNextData)
      if (flow.states[i].properties.play) {
        play = flow.states[i].name + "Play"
        data[play] = flow.states[i].properties.play
        newFlow.states[i].properties.play = "${var.studio_prompts." + flow.states[i].name + "Play}"
      } else {
        play = flow.states[i].name + "Say"
        data[play] = flow.states[i].properties.say
        newFlow.states[i].properties.say = "${var.studio_prompts." + flow.states[i].name + "Say}"
        if (flow.states[i].properties.voice !== undefined) {
          voice = flow.states[i].name + "Voice"
          data[voice] = flow.states[i].properties.voice
          newFlow.states[i].properties.voice = "${var.studio_prompts." + flow.states[i].name + "Voice}"
        }
        if (flow.states[i].properties.language !== undefined) {
          language = flow.states[i].name + "Language"
          data[language] = flow.states[i].properties.language
          newFlow.states[i].properties.language = "${var.studio_prompts." + flow.states[i].name + "Language}"
        }
      }
      say_play.push(data)
      break;
    case "send-to-flex":
      newFlow.states[i].name = "${var.studio_queues." + flow.states[i].name + "Name}"
      updateNextData[flow.states[i].name] = "${var.studio_queues." + flow.states[i].name + "Name}"
      updateNext.push(updateNextData)
      channel = flow.states[i].name + "Channel"
      data[channel] = flow.states[i].properties.channel
      workflow = flow.states[i].name + "Workflow"
      data[workflow] = flow.states[i].properties.workflow
      if (flow.states[i].properties.attributes) {
        attributes = flow.states[i].name + "Attributes"
        data[attributes] = flow.states[i].properties.attributes
        newFlow.states[i].properties.attributes = "${var.studio_queues." + flow.states[i].name + "Attributes}"
      }
      send_to_flex.push(data)
      newFlow.states[i].properties.channel = "${var.studio_queues." + flow.states[i].name + "Channel}"
      newFlow.states[i].properties.workflow = "${var.studio_queues." + flow.states[i].name + "Workflow}"
      break;
    case "add-twiml-redirect":
      newFlow.states[i].name = "${var.studio_twiml_redirect." + flow.states[i].name + "Name}"
      updateNextData[flow.states[i].name] = "${var.studio_twiml_redirect." + flow.states[i].name + "Name}"
      updateNext.push(updateNextData)
      url = flow.states[i].name + "URL"
      data[url] = flow.states[i].properties.url
      add_twiml_redirect.push(data)
      newFlow.states[i].name = "${var.studio_twiml_redirect." + flow.states[i].name + "Name}"
      newFlow.states[i].properties.url = "${var.studio_twiml_redirect." + flow.states[i].name + "URL}"
      break;
    case "run-function":
      newFlow.states[i].name = "${var.studio_functions." + flow.states[i].name + "Name}"
      updateNextData[flow.states[i].name] = "${var.studio_functions." + flow.states[i].name + "Name}"
      updateNext.push(updateNextData)
      if (flow.states[i].properties.service_sid) {
        let service_sid = flow.states[i].name + "Service_sid"
        data[service_sid] = flow.states[i].properties.service_sid
        newFlow.states[i].properties.service_sid = "${var.studio_functions." + flow.states[i].name + "Service_sid}"

      }
      if (flow.states[i].properties.environment_sid) {
        let environment_sid = flow.states[i].name + "Environment_sid"
        data[environment_sid] = flow.states[i].properties.environment_sid
        newFlow.states[i].properties.environment_sid = "${var.studio_functions." + flow.states[i].name + "Environment_sid}"
      }
      if (flow.states[i].properties.function_sid) {
        let function_sid = flow.states[i].name + "Function_sid"
        data[function_sid] = flow.states[i].properties.function_sid
        newFlow.states[i].properties.function_sid = "${var.studio_functions." + flow.states[i].name + "Function_sid}"
      }
      if (flow.states[i].properties.url) {
        let function_sid = flow.states[i].name + "Function_sid"
        url = flow.states[i].name + "URL"
        data[url] = flow.states[i].properties.url
        newFlow.states[i].properties.url = "${var.studio_functions." + flow.states[i].name + "URL}"
      }
      if (flow.states[i].properties.parameters) {
        for (let j = 0; j < flow.states[i].properties.parameters.length; j++) {
          let parametersKey = flow.states[i].name + "ParametersKey" + j
          let parametersValue = flow.states[i].name + "ParametersValue" + j
          data[parametersKey] = flow.states[i].properties.parameters[j].key
          data[parametersValue] = flow.states[i].properties.parameters[j].value
          newFlow.states[i].properties.parameters[j].key = "${var.studio_functions." + flow.states[i].name + "ParametersKey" + j + "}"
          newFlow.states[i].properties.parameters[j].value = "${var.studio_functions." + flow.states[i].name + "ParametersValue" + j + "}"
        }
      }
      run_function.push(data)
      break;
    case "run-subflow":
      newFlow.states[i].name = "${var.studio_subflow." + flow.states[i].name + "Name}"
      updateNextData[flow.states[i].name] = "${var.studio_subflow." + flow.states[i].name + "Name}"
      updateNext.push(updateNextData)
      let flow_sid = flow.states[i].name + "FlowSid"
      data[flow_sid] = flow.states[i].properties.flow_sid
      let flow_revision = flow.states[i].name + "FlowRevision"
      data[flow_revision] = flow.states[i].properties.flow_revision
      run_subflow.push(data)
      newFlow.states[i].properties.flow_sid = "${var.studio_subflow." + flow.states[i].name + "FlowSid}"
      newFlow.states[i].properties.flow_revision = "${var.studio_subflow." + flow.states[i].name + "FlowRevision}"
      alert = 1
      break;
    case "connect-call-to":
      newFlow.states[i].name = "${var.studio_connectcall." + flow.states[i].name + "Name}"
      updateNextData[flow.states[i].name] = "${var.studio_connectcall." + flow.states[i].name + "Name}"
      updateNext.push(updateNextData)
      if (flow.states[i].properties.noun == "number") {
        let connect_number = flow.states[i].name + "ConnectNumber"
        data[connect_number] = (flow.states[i].properties.to)
        connect_call_to.push(data)
        newFlow.states[i].properties.to = "${var.studio_connectcall." + flow.states[i].name + "ConnectNumber}"
      }
      if (flow.states[i].properties.noun == "conference") {
        let connect_number = flow.states[i].name + "ConnectConference"
        data[connect_number] = (flow.states[i].properties.to)
        connect_call_to.push(data)
        newFlow.states[i].properties.to = "${var.studio_connectcall." + flow.states[i].name + "ConnectConference}"
      }
      if (flow.states[i].properties.noun == "sim") {
        let connect_number = flow.states[i].name + "ConnectSim"
        data[connect_number] = (flow.states[i].properties.to)
        connect_call_to.push(data)
        newFlow.states[i].properties.to = "${var.studio_connectcall." + flow.states[i].name + "ConnectSim}"
      }
      if (flow.states[i].properties.noun == "client") {
        let connect_number = flow.states[i].name + "ConnectClient"
        data[connect_number] = (flow.states[i].properties.to)
        connect_call_to.push(data)
        newFlow.states[i].properties.to = "${var.studio_connectcall." + flow.states[i].name + "ConnectClient}"
      }
      if (flow.states[i].properties.noun == "number-multi") {
        let connect_number = flow.states[i].name + "ConnectMultiNumber"
        data[connect_number] = (flow.states[i].properties.to)
        connect_call_to.push(data)
        newFlow.states[i].properties.to = "${var.studio_connectcall." + flow.states[i].name + "ConnectMultiNumber}"
      }
      if (flow.states[i].properties.noun == "sip") {
        let connect_endpoint = flow.states[i].name + "SipEndpoint"
        data[connect_endpoint] = flow.states[i].properties.sip_endpoint

        if (flow.states[i].properties.sip_username && flow.states[i].properties.sip_username !== "") {
          let connect_username = flow.states[i].name + "SipUserName"
          data[connect_username] = flow.states[i].properties.sip_username
          newFlow.states[i].properties.sip_username = "${var.studio_connectcall." + flow.states[i].name + "SipUserName}"
        }
        if (flow.states[i].properties.sip_password && flow.states[i].properties.sip_password !== "") {
          let connect_password = flow.states[i].name + "SipPassword"
          data[connect_password] = flow.states[i].properties.sip_password
          newFlow.states[i].properties.sip_password = "${var.studio_connectcall." + flow.states[i].name + "SipPassword}"
        }
        connect_call_to.push(data)
      }
      break;
    case "record-voicemail":
      newFlow.states[i].name = "${var.studio_voicemail." + flow.states[i].name + "Name}"
      updateNextData[flow.states[i].name] = "${var.studio_voicemail." + flow.states[i].name + "Name}"
      updateNext.push(updateNextData)
      record_voicemail.push(data)
      break;
    case "enqueue-call":
      newFlow.states[i].name = "${var.studio_queues." + flow.states[i].name + "Name}"
      updateNextData[flow.states[i].name] = "${var.studio_queues." + flow.states[i].name + "Name}"
      updateNext.push(updateNextData)
      workflow = flow.states[i].name + "Workflow"
      data[workflow] = flow.states[i].properties.workflow
      WaitURL = flow.states[i].name + "WaitURL"
      data[WaitURL] = flow.states[i].properties.wait_url
      if (flow.states[i].properties.attributes) {
        attributes = flow.states[i].name + "Attributes"
        data[attributes] = flow.states[i].properties.attributes
        newFlow.states[i].properties.attributes = "${var.studio_queues." + flow.states[i].name + "Attributes}"
      }
      send_to_flex.push(data)
      newFlow.states[i].properties.workflow_sid = "${var.studio_queues." + flow.states[i].name + "Workflow}"
      newFlow.states[i].properties.wait_url = "${var.studio_queues." + flow.states[i].name + "WaitURL}"
      break;
    case "fork-stream":
      newFlow.states[i].name = "${var.studio_stream." + flow.states[i].name + "Name}"
      updateNextData[flow.states[i].name] = "${var.studio_stream." + flow.states[i].name + "Name}"
      updateNext.push(updateNextData)
      stream_name = flow.states[i].name + "StreamName"
      data[stream_name] = flow.states[i].properties.stream_name
      stream_transport_type = flow.states[i].name + "StreamTransportType"
      data[stream_transport_type] = flow.states[i].properties.stream_transport_type
      if (flow.states[i].properties.stream_transport_type == "websocket") {
        stream_url = flow.states[i].name + "StreamURL"
        data[stream_url] = flow.states[i].properties.stream_url
      } else {
        stream_connector = flow.states[i].name + "StreamConnector"
        data[stream_connector] = flow.states[i].properties.stream_connector
      }
      stream_action = flow.states[i].name + "StreamAction"
      data[stream_action] = flow.states[i].properties.stream_action
      stream_track = flow.states[i].name + "StreamTrack"
      data[stream_track] = flow.states[i].properties.stream_track

      fork_stream.push(data)
      newFlow.states[i].properties.stream_name = "${var.studio_stream." + flow.states[i].name + "StreamName}"
      newFlow.states[i].properties.stream_transport_type = "${var.studio_stream." + flow.states[i].name + "StreamTransportType}"
      newFlow.states[i].properties.stream_action = "${var.studio_stream." + flow.states[i].name + "StreamAction}"
      newFlow.states[i].properties.stream_track = "${var.studio_stream." + flow.states[i].name + "StreamTrack}"
      newFlow.states[i].properties.stream_url = "${var.studio_stream." + flow.states[i].name + "StreamURL}"
      break;
    case "connect-virtual-agent":
      newFlow.states[i].name = "${var.studio_virtualagent." + flow.states[i].name + "Name}"
      updateNextData[flow.states[i].name] = "${var.studio_virtualagent." + flow.states[i].name + "Name}"
      updateNext.push(updateNextData)
      connector = flow.states[i].name + "Connector"
      data[connector] = flow.states[i].properties.connector
      language = flow.states[i].name + "Language"
      data[language] = flow.states[i].properties.language
      status_callback = flow.states[i].name + "StatusCallback"
      data[status_callback] = flow.states[i].properties.status_callback
      sentiment = flow.states[i].name + "SentimentAnalisys"
      data[sentiment] = flow.states[i].properties.sentiment_analysis
      connect_virtual_agent.push(data)
      newFlow.states[i].properties.connector = "${var.studio_virtualagent." + flow.states[i].name + "Connector}"
      newFlow.states[i].properties.language = "${var.studio_virtualagent." + flow.states[i].name + "Language}"
      newFlow.states[i].properties.status_callback = "${var.studio_virtualagent." + flow.states[i].name + "StatusCallback}"
      break;
    case "send-message":
      newFlow.states[i].name = "${var.studio_sendmessage." + flow.states[i].name + "Name}"
      updateNextData[flow.states[i].name] = "${var.studio_sendmessage." + flow.states[i].name + "Name}"
      updateNext.push(updateNextData)
      from = flow.states[i].name + "From"
      data[from] = flow.states[i].properties.from
      attributes = flow.states[i].name + "Attributes"
      data[attributes] = flow.states[i].properties.attributes
      to = flow.states[i].name + "To"
      data[to] = flow.states[i].properties.to
      body = flow.states[i].name + "Body"
      data[body] = flow.states[i].properties.body
      send_message.push(data)
      newFlow.states[i].properties.from = "${var.studio_sendmessage." + flow.states[i].name + "From}"
      newFlow.states[i].properties.attributes = "${var.studio_sendmessage." + flow.states[i].name + "Attributes}"
      newFlow.states[i].properties.to = "${var.studio_sendmessage." + flow.states[i].name + "To}"
      newFlow.states[i].properties.body = "${var.studio_sendmessage." + flow.states[i].name + "Body}"
      break;
    case "send-and-wait-for-reply":
      newFlow.states[i].name = "${var.studio_sendmessage." + flow.states[i].name + "Name}"
      updateNextData[flow.states[i].name] = "${var.studio_sendmessage." + flow.states[i].name + "Name}"
      updateNext.push(updateNextData)
      from = flow.states[i].name + "From"
      data[from] = flow.states[i].properties.from
      media_url = flow.states[i].name + "MediaURL"
      data[media_url] = flow.states[i].properties.media_url
      body = flow.states[i].name + "Body"
      data[body] = flow.states[i].properties.body
      send_message.push(data)
      newFlow.states[i].properties.from = "${var.studio_sendmessage." + flow.states[i].name + "From}"
      newFlow.states[i].properties.media_url = "${var.studio_sendmessage." + flow.states[i].name + "MediaURL}"
      newFlow.states[i].properties.body = "${var.studio_sendmessage." + flow.states[i].name + "Body}"
      break;
    case "make-http-request":
      newFlow.states[i].name = "${var.studio_functions." + flow.states[i].name + "Name}"
      updateNextData[flow.states[i].name] = "${var.studio_functions." + flow.states[i].name + "Name}"
      updateNext.push(updateNextData)
      let method = flow.states[i].name + "Method"
      data[method] = flow.states[i].properties.method
      let content_type = flow.states[i].name + "ContentType"
      data[content_type] = flow.states[i].properties.content_type
      let httpbody = flow.states[i].name + "Body"
      data[httpbody] = flow.states[i].properties.body
      url = flow.states[i].name + "URL"
      data[url] = flow.states[i].properties.url
      run_function.push(data)
      newFlow.states[i].properties.method = "${var.studio_functions." + flow.states[i].name + "Method}"
      newFlow.states[i].properties.content_type = "${var.studio_functions." + flow.states[i].name + "ContentType}"
      newFlow.states[i].properties.body = "${var.studio_functions." + flow.states[i].name + "Body}"
      newFlow.states[i].properties.url = "${var.studio_functions." + flow.states[i].name + "URL}"
      break;
    case "send-to-auto-pilot":
      newFlow.states[i].name = "${var.studio_autopilot." + flow.states[i].name + "Name}"
      updateNextData[flow.states[i].name] = "${var.studio_autopilot." + flow.states[i].name + "Name}"
      updateNext.push(updateNextData)
      let memory_parameters = flow.states[i].name + "MemoryParameters"
      data[memory_parameters] = flow.states[i].properties.memory_parameters[0]
      let autopilot_assistant_sid = flow.states[i].name + "AutopilotAssistantSid"
      data[autopilot_assistant_sid] = flow.states[i].properties.autopilot_assistant_sid
      let apbody = flow.states[i].name + "Body"
      data[apbody] = flow.states[i].properties.body
      target_task = flow.states[i].name + "TargetTask"
      data[target_task] = flow.states[i].properties.target_task
      timeout = flow.states[i].name + "Timeout"
      data[timeout] = flow.states[i].properties.timeout
      send_to_auto_pilot.push(data)
      newFlow.states[i].properties.waitUrl = "${var.studio_autopilot." + flow.states[i].name + "WaitUrl}"
      newFlow.states[i].properties.workflow = "${var.studio_autopilot." + flow.states[i].name + "Workflow}"
      newFlow.states[i].properties.channel = "${var.studio_autopilot." + flow.states[i].name + "Channel}"
      newFlow.states[i].properties.attributes = "${var.studio_autopilot." + flow.states[i].name + "Attributes}"
      newFlow.states[i].properties.waitUrlMethod = "${var.studio_autopilot." + flow.states[i].name + "WaitUrlMethod}"
      break;
    case "make-outgoing-call-v2":
      newFlow.states[i].name = "${var.studio_makeoutgoingcallv2." + flow.states[i].name + "Name}"
      updateNextData[flow.states[i].name] = "${var.studio_makeoutgoingcallv2." + flow.states[i].name + "Name}"
      updateNext.push(updateNextData)
      make_outgoing_call_v2.push(data)
      break;
    case "connect-virtual-agent-v2":
      newFlow.states[i].name = "${var.studio_virtualagentv2." + flow.states[i].name + "Name}"
      updateNextData[flow.states[i].name] = "${var.studio_virtualagentv2." + flow.states[i].name + "Name}"
      updateNext.push(updateNextData)
      connector = flow.states[i].name + "Connector"
      data[connector] = flow.states[i].properties.connector_name
      status_callback_method = flow.states[i].name + "StatusCallbackMethod"
      data[status_callback_method] = flow.states[i].properties.status_callback_method
      status_callback = flow.states[i].name + "StatusCallback"
      data[status_callback] = flow.states[i].properties.status_callback
      if (flow.states[i].properties.parameters) {
        for (let j = 0; j < flow.states[i].properties.parameters.length; j++) {
          let parametersKey = flow.states[i].name + "ParametersKey" + j
          let parametersValue = flow.states[i].name + "ParametersValue" + j
          data[parametersKey] = flow.states[i].properties.parameters[j].key
          data[parametersValue] = flow.states[i].properties.parameters[j].value
          newFlow.states[i].properties.parameters[j].key = "${var.studio_virtualagentv2." + flow.states[i].name + "ParametersKey" + j + "}"
          newFlow.states[i].properties.parameters[j].value = "${var.studio_virtualagentv2." + flow.states[i].name + "ParametersValue" + j + "}"
        }
      }
      if (flow.states[i].properties.configurations) {
        for (let j = 0; j < flow.states[i].properties.configurations.length; j++) {
          let configurationsKey = flow.states[i].name + "ConfigurationsKey" + j
          let configurationsValue = flow.states[i].name + "ConfigurationsValue" + j
          data[configurationsKey] = flow.states[i].properties.configurations[j].key
          data[configurationsValue] = flow.states[i].properties.configurations[j].value
          newFlow.states[i].properties.configurations[j].key = "${var.studio_virtualagentv2." + flow.states[i].name + "ConfigurationsKey" + j + "}"
          newFlow.states[i].properties.configurations[j].value = "${var.studio_virtualagentv2." + flow.states[i].name + "ConfigurationsValue" + j + "}"
        }
      }
      connect_virtual_agent_v2.push(data)
      newFlow.states[i].properties.connector = "${var.studio_virtualagentv2." + flow.states[i].name + "Connector}"
      newFlow.states[i].properties.language = "${var.studio_virtualagentv2." + flow.states[i].name + "Language}"
      newFlow.states[i].properties.status_callback = "${var.studio_virtualagentv2." + flow.states[i].name + "StatusCallback}"

      break;
    case "record-call":
      newFlow.states[i].name = "${var.studio_recordcall." + flow.states[i].name + "Name}"
      updateNextData[flow.states[i].name] = "${var.studio_recordcall." + flow.states[i].name + "Name}"
      updateNext.push(updateNextData)
      statusCallback = flow.states[i].name + "RecordingStatusCallback"
      data[statusCallback] = flow.states[i].properties.recording_status_callback
      statusCallbackMethod = flow.states[i].name + "RecordingStatusCallbackMethod"
      data[statusCallbackMethod] = flow.states[i].properties.recording_status_callback_method
      statusCallbackEvents = flow.states[i].name + "RecordingStatusCallbackEvents"
      data[statusCallbackEvents] = flow.states[i].properties.recording_status_callback_events
      recordingChannels = flow.states[i].name + "RecordingChannels"
      data[recordingChannels] = flow.states[i].properties.recording_channels
      newFlow.states[i].properties.recording_status_callback = "${var.studio_recordcall." + flow.states[i].name + "RecordingStatusCallback}"
      newFlow.states[i].properties.recording_status_callback_method = "${var.studio_recordcall." + flow.states[i].name + "RecordingStatusCallbackMethod}"
      newFlow.states[i].properties.recording_status_callback_events = "${var.studio_recordcall." + flow.states[i].name + "RecordingStatusCallbackEvents}"
      newFlow.states[i].properties.recording_channels = "${var.studio_recordcall." + flow.states[i].name + "RecordingChannels}"
      record_call.push(data)
      break;
    case "run-model-inference":
      newFlow.states[i].name = "${var.studio_run-model-inference." + flow.states[i].name + "Name}"
      updateNextData[flow.states[i].name] = "${var.studio_run-model-inference." + flow.states[i].name + "Name}"
      updateNext.push(updateNextData)
      primitive_sid = flow.states[i].name + "OperatorName"
      data[primitive_sid] = flow.states[i].properties.primitive_sid
      newFlow.states[i].properties.primitive_sid = "${var.studio_run-model-inference." + flow.states[i].name + "RecordingStatusCallback}"
      primitive_sid
      run_model_inference.push(data)
      break;
    default:
      console.log("**** To do:", flow.states[i].type)
  }
}

for (let j = 0; j < run_function.length; j++) {
  for (let k = 0; k < Object.keys(run_function[j]).length; k++) {
    functionTemplate = functionTemplate + "\n\t" + (Object.keys(run_function[j])[k] + " = " + JSON.stringify(Object.values(run_function[j])[k]))
  }
}
functionTemplate = functionTemplate.split('\n').slice(1).join('\n');

for (let j = 0; j < say_play.length; j++) {
  for (let k = 0; k < Object.keys(say_play[j]).length; k++) {
    promptTemplate = promptTemplate + "\n\t" + (Object.keys(say_play[j])[k] + " = " + JSON.stringify(Object.values(say_play[j])[k]))
  }

}
promptTemplate = promptTemplate.split('\n').slice(1).join('\n');

for (let j = 0; j < add_twiml_redirect.length; j++) {
  for (let k = 0; k < Object.keys(add_twiml_redirect[j]).length; k++) {
    twimlTemplate = twimlTemplate + "\n\t" + (Object.keys(add_twiml_redirect[j])[k] + " = " + JSON.stringify(Object.values(add_twiml_redirect[j])[k]))
  }

}
twimlTemplate = twimlTemplate.split('\n').slice(1).join('\n');

for (let j = 0; j < set_variables.length; j++) {
  for (let k = 0; k < Object.keys(set_variables[j]).length; k++) {
    variablesTemplate = variablesTemplate + "\n\t" + (Object.keys(set_variables[j])[k] + " = " + JSON.stringify(Object.values(set_variables[j])[k]))
  }

}
variablesTemplate = variablesTemplate.split('\n').slice(1).join('\n');

for (let j = 0; j < send_to_flex.length; j++) {
  for (let k = 0; k < Object.keys(send_to_flex[j]).length; k++) {
    queuesTemplate = queuesTemplate + "\n\t" + (Object.keys(send_to_flex[j])[k] + " = " + JSON.stringify(Object.values(send_to_flex[j])[k]))
  }
}

for (let j = 0; j < split_based_on.length; j++) {
  for (let k = 0; k < Object.keys(split_based_on[j]).length; k++) {
    splitTemplate = splitTemplate + "\n\t" + (Object.keys(split_based_on[j])[k] + " = " + JSON.stringify(Object.values(split_based_on[j])[k]))
  }

}
splitTemplate = splitTemplate.split('\n').slice(1).join('\n');

for (let j = 0; j < run_subflow.length; j++) {
  for (let k = 0; k < Object.keys(run_subflow[j]).length; k++) {
    subflowTemplate = subflowTemplate + "\n\t" + (Object.keys(run_subflow[j])[k] + " = " + JSON.stringify(Object.values(run_subflow[j])[k]))
  }

}
subflowTemplate = subflowTemplate.split('\n').slice(1).join('\n');

for (let j = 0; j < connect_call_to.length; j++) {
  for (let k = 0; k < Object.keys(connect_call_to[j]).length; k++) {
    connectTemplate = connectTemplate + "\n\t" + (Object.keys(connect_call_to[j])[k] + " = " + JSON.stringify(Object.values(connect_call_to[j])[k]))
  }

}
connectTemplate = connectTemplate.split('\n').slice(1).join('\n');

for (let j = 0; j < record_voicemail.length; j++) {
  for (let k = 0; k < Object.keys(record_voicemail[j]).length; k++) {
    voicemailTemplate = voicemailTemplate + "\n\t" + (Object.keys(record_voicemail[j])[k] + " = " + JSON.stringify(Object.values(record_voicemail[j])[k]))
  }

}
voicemailTemplate = voicemailTemplate.split('\n').slice(1).join('\n');

for (let j = 0; j < fork_stream.length; j++) {
  for (let k = 0; k < Object.keys(fork_stream[j]).length; k++) {
    streamTemplate = streamTemplate + "\n\t" + (Object.keys(fork_stream[j])[k] + " = " + JSON.stringify(Object.values(fork_stream[j])[k]))
  }

}
streamTemplate = streamTemplate.split('\n').slice(1).join('\n');

for (let j = 0; j < connect_virtual_agent.length; j++) {
  for (let k = 0; k < Object.keys(connect_virtual_agent[j]).length; k++) {
    virtualAgentTemplate = virtualAgentTemplate + "\n\t" + (Object.keys(connect_virtual_agent[j])[k] + " = " + JSON.stringify(Object.values(connect_virtual_agent[j])[k]))
  }

}
virtualAgentTemplate = virtualAgentTemplate.split('\n').slice(1).join('\n');

for (let j = 0; j < connect_virtual_agent_v2.length; j++) {
  for (let k = 0; k < Object.keys(connect_virtual_agent_v2[j]).length; k++) {
    virtualAgentV2Template = virtualAgentV2Template + "\n\t" + (Object.keys(connect_virtual_agent_v2[j])[k] + " = " + JSON.stringify(Object.values(connect_virtual_agent_v2[j])[k]))
  }

}
virtualAgentV2Template = virtualAgentV2Template.split('\n').slice(1).join('\n');

for (let j = 0; j < send_message.length; j++) {
  for (let k = 0; k < Object.keys(send_message[j]).length; k++) {
    sendMessageTemplate = sendMessageTemplate + "\n\t" + (Object.keys(send_message[j])[k] + " = " + JSON.stringify(Object.values(send_message[j])[k]))
  }

}
sendMessageTemplate = sendMessageTemplate.split('\n').slice(1).join('\n');

for (let j = 0; j < send_to_auto_pilot.length; j++) {
  for (let k = 0; k < Object.keys(send_to_auto_pilot[j]).length; k++) {
    autoPilotTemplate = autoPilotTemplate + "\n\t" + (Object.keys(send_to_auto_pilot[j])[k] + " = " + JSON.stringify(Object.values(send_to_auto_pilot[j])[k]))
  }

}
autoPilotTemplate = autoPilotTemplate.split('\n').slice(1).join('\n');

for (let j = 0; j < make_outgoing_call_v2.length; j++) {
  for (let k = 0; k < Object.keys(make_outgoing_call_v2[j]).length; k++) {
    makeOutgoingCallV2Template = makeOutgoingCallV2Template + "\n\t" + (Object.keys(make_outgoing_call_v2[j])[k] + " = " + JSON.stringify(Object.values(make_outgoing_call_v2[j])[k]))
  }

}
makeOutgoingCallV2Template = makeOutgoingCallV2Template.split('\n').slice(1).join('\n');

for (let j = 0; j < record_call.length; j++) {
  for (let k = 0; k < Object.keys(record_call[j]).length; k++) {
    recordCallTemplate = recordCallTemplate + "\n\t" + (Object.keys(record_call[j])[k] + " = " + JSON.stringify(Object.values(record_call[j])[k]))
  }
}
recordCallTemplate = recordCallTemplate.split('\n').slice(1).join('\n');

for (let j = 0; j < run_model_inference.length; j++) {
  for (let k = 0; k < Object.keys(run_model_inference[j]).length; k++) {
    runModelInferenceTemplate = runModelInferenceTemplate + "\n\t" + (Object.keys(run_model_inference[j])[k] + " = " + JSON.stringify(Object.values(run_model_inference[j])[k]))
  }
}
runModelInferenceTemplate = runModelInferenceTemplate.split('\n').slice(1).join('\n');

let tfvarbegin = "\nvariable \""
let tfvarmid = "\" {\n\ttype = object({\n\t"
let tfvarend = "\n\t\t\}\)\n\tsensitive = false\n}"
let tfvar = "variable \"studio_base\" {\n\ttype = object({\n\t\tfriendly_name = string\n\t\t})\n\tsensitive = false\n}"

let template = `studio_base = {
\tfriendly_name = ${JSON.stringify(newFlow.description)}
}`
if (promptTemplate) {
  template = template + `\nstudio_prompts={\n${promptTemplate}\n}`
  tfvar = tfvar + tfvarbegin + "studio_prompts" + tfvarmid + promptTemplate + tfvarend
}
if (functionTemplate) {
  template = template + `\nstudio_functions={\n${functionTemplate}\n}`
  tfvar = tfvar + tfvarbegin + "studio_functions" + tfvarmid + functionTemplate + tfvarend
}
if (twimlTemplate) {
  template = template + `\nstudio_twiml_redirect={\n${twimlTemplate}\n}`
  tfvar = tfvar + tfvarbegin + "studio_twiml_redirect" + tfvarmid + twimlTemplate + tfvarend
}

if (splitTemplate) {
  template = template + `\nstudio_split={\n${splitTemplate}\n}`
  tfvar = tfvar + tfvarbegin + "studio_split" + tfvarmid + splitTemplate + tfvarend
}
if (variablesTemplate) {
  template = template + `\nstudio_variables={\n${variablesTemplate}\n}`
  tfvar = tfvar + tfvarbegin + "studio_variables" + tfvarmid + variablesTemplate + tfvarend
}
if (subflowTemplate) {
  template = template + `\nstudio_subflow={\n${subflowTemplate}\n}`
  tfvar = tfvar + tfvarbegin + "studio_subflow" + tfvarmid + subflowTemplate + tfvarend
}
if (connectTemplate) {
  template = template + `\nstudio_connectcall={\n${connectTemplate}\n}`
  tfvar = tfvar + tfvarbegin + "studio_connectcall" + tfvarmid + connectTemplate + tfvarend
}
if (voicemailTemplate) {
  template = template + `\nstudio_voicemail={\n${voicemailTemplate}\n}`
  tfvar = tfvar + tfvarbegin + "studio_voicemail" + tfvarmid + voicemailTemplate + tfvarend
}
if (streamTemplate) {
  template = template + `\nstudio_stream={\n${streamTemplate}\n}`
  tfvar = tfvar + tfvarbegin + "studio_stream" + tfvarmid + streamTemplate + tfvarend
}
if (virtualAgentTemplate) {
  template = template + `\nstudio_virtualagent={\n${virtualAgentTemplate}\n}`
  tfvar = tfvar + tfvarbegin + "studio_virtualagent" + tfvarmid + virtualAgentTemplate + tfvarend
}
if (virtualAgentV2Template) {
  template = template + `\nstudio_virtualagentv2={\n${virtualAgentV2Template}\n}`
  tfvar = tfvar + tfvarbegin + "studio_virtualagent" + tfvarmid + virtualAgentV2Template + tfvarend
}
if (sendMessageTemplate) {
  template = template + `\nstudio_sendmessage={\n${sendMessageTemplate}\n}`
  tfvar = tfvar + tfvarbegin + "studio_sendmessage" + tfvarmid + sendMessageTemplate + tfvarend
}
if (autoPilotTemplate) {
  template = template + `\nstudio_autopilot={\n${autoPilotTemplate}\n}`
  tfvar = tfvar + tfvarbegin + "studio_autopilot" + tfvarmid + autoPilotTemplate + tfvarend
}

if (makeOutgoingCallV2Template) {
  template = template + `\nstudio_makeoutgoingcallv2={\n${makeOutgoingCallV2Template}\n}`
  tfvar = tfvar + tfvarbegin + "studio_makeoutgoingcallv2" + tfvarmid + makeOutgoingCallV2Template + tfvarend
}

if (recordCallTemplate) {
  template = template + `\nstudio_recordcall={\n${recordCallTemplate}\n}`
  tfvar = tfvar + tfvarbegin + "studio_recordcall" + tfvarmid + recordCallTemplate + tfvarend
}

if (runModelInferenceTemplate) {
  template = template + `\nstudio_eip={\n${runModelInferenceTemplate}\n}`
  tfvar = tfvar + tfvarbegin + "studio_eip" + tfvarmid + runModelInferenceTemplate + tfvarend
}


fs.writeFile("output.tfvars", template
  , (err) => {
    if (err)
      console.log("err", err);
  });


newFlow.description = "${var.studio_base.friendly_name}"

for (let i = 0; i < newFlow.states.length; i++) {
  for (let j = 0; j < newFlow.states[i].transitions.length; j++) {
    if (Object.keys(newFlow.states[i].transitions[j])[0] == "next") {
      let nextToReplace = newFlow.states[i].transitions[j].next
      for (let k = 0; k < updateNext.length; k++) {
        if (nextToReplace == Object.keys(updateNext[k])[0]) {
          newFlow.states[i].transitions[j].next = Object.values(updateNext[k])[0]
        }
      }
    }
  }
}

fs.writeFile("output.json", JSON.stringify(newFlow)
  , (err) => {
    if (err)
      console.log("err", err);
  });
tfvar = tfvar.replace(/\ = \"(.+)/g, ' = string')
//tfvar = tfvar.replace(/\=\"(.+)/g, ' = string')

fs.writeFile("variables.txt", tfvar
  , (err) => {
    if (err)
      console.log("err", err);
  });

if (alert == 1) {
  console.log("***** Make sure the Subflows are created before deploying the Terraform *****")
  console.log("***** Make sure the Subflows are created before deploying the Terraform *****")
  console.log("***** Make sure the Subflows are created before deploying the Terraform *****")
  console.log("***** Make sure the Subflows are created before deploying the Terraform *****")
}
console.log("Next Step: Edit the test.tfvars file as needed")