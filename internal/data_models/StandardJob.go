package data_models

import "encoding/json"

func UnmarshalStandardJob(data []byte) (StandardJob, error) {
	var r StandardJob
	err := json.Unmarshal(data, &r)
	return r, err
}

func (r *StandardJob) Marshal() ([]byte, error) {
	return json.Marshal(r)
}

type StandardJob struct {
	Jobs []Job `json:"jobs"`
}

type Job struct {
	StartDate      string   `json:"startDate"`
	DueDate        string   `json:"dueDate"`
	JobNumber      string   `json:"jobNumber"`
	ShNumber       string   `json:"shNumber"`
	OrderNumber    string   `json:"orderNumber"`
	Client         Client   `json:"client"`
	Description    string   `json:"description"`
	Status         string   `json:"status"`
	MeterNumber    string   `json:"meterNumber"`
	WorkCarriedOut []string `json:"workCarriedOut"`
}

type Client struct {
	Name string `json:"name"`
	Site string `json:"site"`
}
