# Storage

## Hash parameter

All storages must make use of the `hash` parameter in order keep transformations up to date as preset configuration changes.

## S3 Storage

The S3 storage uploads transformations to a S3 bucket, or any other provider implementing the S3 interface \(for example Digital Ocean Spaces\). 

### Example

```yaml
storage:
  s3:
    access_key_id: 'xxxx'
    secret_access_key: 'yyyy'
    region: 'nyc3'
    bucket_name: 'zzz'
    path: '/:preset/:image.:hash'
```

### Options

<table>
  <thead>
    <tr>
      <th style="text-align:left">Name</th>
      <th style="text-align:left"></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">access_key_id</td>
      <td style="text-align:left">
        <p>Access key id from S3</p>
        <p>
          <br /><b>Type: </b>string</p>
        <p><b>Required</b>
        </p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">secret_access_key</td>
      <td style="text-align:left">
        <p>Secret access key from S3</p>
        <p></p>
        <p><b>Type: </b>string</p>
        <p><b>Required</b>
        </p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">region</td>
      <td style="text-align:left">
        <p>Region of S3 bucket</p>
        <p></p>
        <p><b>Type: </b>string</p>
        <p><b>Required</b>
        </p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">bucket_name</td>
      <td style="text-align:left">
        <p>Name of bucket</p>
        <p></p>
        <p><b>Type: </b>string</p>
        <p><b>Required</b>
        </p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">path</td>
      <td style="text-align:left">
        <p>Path of the original image in the bucket.</p>
        <p></p>
        <p><b>Type: </b>string with parameters</p>
        <p><b>Required</b>
        </p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">endpoint</td>
      <td style="text-align:left">
        <p>Which endpoint to use, useful if using Digital Ocean Spaces.</p>
        <p></p>
        <p><b>Type: </b>string</p>
        <p><b>Default: </b>derived from bucket_name and region, as per AWS standard.</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">ACL</td>
      <td style="text-align:left">
        <p>What ACL should be set on the uploaded object. See available values here:
          <a
          href="https://docs.aws.amazon.com/AmazonS3/latest/dev/acl-overview.html">https://docs.aws.amazon.com/AmazonS3/latest/dev/acl-overview.html</a>.</p>
        <p></p>
        <p><b>Type: </b>string</p>
        <p><b>Default</b>: 'private'</p>
      </td>
    </tr>
  </tbody>
</table>

