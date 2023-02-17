studio_base = {
	friendly_name = "A New Flow"
}
studio_prompts={
	gather_1Name = "gather_1"
	gather_1Say = "Hi"
	gather_1Voice = "alice"
	gather_1Language = "en-US"
	gather_2Name = "gather_2"
	gather_2Play = "https://pmidemo-7846.twil.io/1900%20Message.mp3"
	say_play_1Name = "say_play_1"
	say_play_1Say = "hi"
	say_play_1Voice = "alice"
	say_play_1Language = "en-US"
	say_play_2Name = "say_play_2"
	say_play_2Play = "https://sitetemplate-8203-dev.twil.io/AfterHours.mp3"
}
studio_split={
	split_1Name = "split_1"
}
studio_variables={
	set_variables_1Name = "set_variables_1"
}
studio_subflow={
	run_subflow_1Name = "run_subflow_1"
	run_subflow_1FlowSid = "FWec489506c4e55806663175728890b431"
	run_subflow_1FlowRevision = "18"
}
studio_connectcall={
	connect_call_1Name = "connect_call_1"
	connect_call_1ConnectNumber = "+6586115961"
}
studio_voicemail={
	record_voicemail_1Name = "record_voicemail_1"
}
studio_stream={
	stream_1Name = "stream_1"
	stream_1StreamName = "Test"
	stream_1StreamTransportType = "siprec"
	stream_1StreamConnector = "Test"
	stream_1StreamAction = "start"
	stream_1StreamTrack = "inbound_track"
}
studio_virtualagent={
	connect_virtual_agent_1Name = "connect_virtual_agent_1"
	connect_virtual_agent_1Connector = "test"
	connect_virtual_agent_1Language = "en-US"
	connect_virtual_agent_1StatusCallback = "https://callback"
	connect_virtual_agent_1SentimentAnalisys = "true"
}
studio_virtualagentv2={
	connect_virtual_agent_2Name = "connect_virtual_agent_2"
	connect_virtual_agent_2Connector = "555"
	connect_virtual_agent_2StatusCallbackMethod = "POST"
	connect_virtual_agent_2StatusCallback = "https://callback"
	connect_virtual_agent_2ParametersKey0 = "10"
	connect_virtual_agent_2ParametersValue0 = "10"
	connect_virtual_agent_2ConfigurationsKey0 = "15"
	connect_virtual_agent_2ConfigurationsValue0 = "15"
}
studio_sendmessage={
	send_message_1Name = "send_message_1"
	send_message_1From = "{{flow.channel.address}}"
	send_message_1Attributes = "att"
	send_message_1To = "{{contact.channel.address}}"
	send_message_1Body = "Hi"
	send_and_reply_1Name = "send_and_reply_1"
	send_and_reply_1From = "{{flow.channel.address}}"
	send_and_reply_1MediaURL = "https://mediaurl"
	send_and_reply_1Body = "test"
}
studio_makeoutgoingcallv2={
	call_user_1Name = "call_user_1"
}
studio_recordcall={
	call_recording_1Name = "call_recording_1"
	call_recording_1RecordingStatusCallback = ""
	call_recording_1RecordingStatusCallbackMethod = "POST"
	call_recording_1RecordingStatusCallbackEvents = "completed"
	call_recording_1RecordingChannels = "dual"
}
studio_eip={
	operator_inference_1Name = "operator_inference_1"
	operator_inference_1OperatorName = "LY3a5de4f27b1b4439b7af115d4c4d9820"
}