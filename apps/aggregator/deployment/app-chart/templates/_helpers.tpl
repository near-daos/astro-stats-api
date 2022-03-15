{{/* vim: set filetype=mustache: */}}
{{/*
Create variables for aggregator deployment
*/}}

{{/* vim: set filetype=mustache: */}}
{{/*
Expand the name of the chart.
*/}}
{{- define "astro-stats-aggregator.name" -}}
{{- default .Chart.Name .Values.aggregatorNameOverride | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "astro-stats-aggregator.fullname" -}}
{{- if .Values.aggregatorFullnameOverride -}}
{{- .Values.aggregatorFullnameOverride | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- $name := default .Chart.Name .Values.aggregatorNameOverride -}}
{{- if contains $name .Release.Name -}}
{{- .Release.Name | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" -}}
{{- end -}}
{{- end -}}
{{- end -}}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "astro-stats-aggregator.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{/*
Common labels
*/}}
{{- define "astro-stats-aggregator.labels" -}}
helm.sh/chart: {{ include "astro-stats-aggregator.chart" . }}
{{ include "astro-stats-aggregator.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end -}}

{{/*
Selector labels
*/}}
{{- define "astro-stats-aggregator.selectorLabels" -}}
app.kubernetes.io/name: {{ include "astro-stats-aggregator.name" . }}
app.kubernetes.io/instance: "astro-stats-api"
{{- end -}}

{{/*
Create the name of the service account to use
*/}}
{{- define "astro-stats-aggregator.serviceAccountName" -}}
{{- if .Values.serviceAccount.create -}}
    {{ default (include "astro-stats-aggregator.fullname" .) .Values.serviceAccount.name }}
{{- else -}}
    {{ default "default" .Values.serviceAccount.name }}
{{- end -}}
{{- end -}}
