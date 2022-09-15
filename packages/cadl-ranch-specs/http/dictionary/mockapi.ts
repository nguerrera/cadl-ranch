import { passOnSuccess, ScenarioMockApi, mockapi, json, MockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

interface MockApiGetPut {
  get: MockApi;
  put: MockApi;
}

/**
 * Return the get and put operations
 * @param route The route within /dictionary for your function.
 * @param value The value you are expecting and will return.
 */
function createModelMockApis(route: string, value: any): MockApiGetPut {
  const url = `/dictionary/${route}`;
  const body = { property: value };
  return {
    get: mockapi.get(url, (req) => {
      return {
        status: 200,
        body: json(body),
      };
    }),
    put: mockapi.put(url, (req) => {
      req.expect.bodyEquals(body);
      return {
        status: 204,
      };
    }),
  };
}

const Int32ValueMock = createModelMockApis("dictionary/int32", { k1: 1, k2: 2 });
Scenarios.Dictionary_Int32Value_get = passOnSuccess(Int32ValueMock.get);
Scenarios.Dictionary_Int32Value_put = passOnSuccess(Int32ValueMock.put);

const Int64ValueMock = createModelMockApis("dictionary/int64", { k1: 0x7fffffffffffffff, k2: -0x7fffffffffffffff });
Scenarios.Dictionary_Int64Value_get = passOnSuccess(Int64ValueMock.get);
Scenarios.Dictionary_Int64Value_put = passOnSuccess(Int64ValueMock.put);

const BooleanValueMock = createModelMockApis("dictionary/boolean", { k1: true, k2: false });
Scenarios.Dictionary_BooleanValue_get = passOnSuccess(BooleanValueMock.get);
Scenarios.Dictionary_BooleanValue_put = passOnSuccess(BooleanValueMock.put);

const StringValueMock = createModelMockApis("dictionary/string", { k1: "hello", k2: "" });
Scenarios.Dictionary_StringValue_get = passOnSuccess(StringValueMock.get);
Scenarios.Dictionary_StringValue_put = passOnSuccess(StringValueMock.put);

const Float32ValueMock = createModelMockApis("dictionary/float32", { k1: 42.42 });
Scenarios.Dictionary_Float32Value_get = passOnSuccess(Float32ValueMock.get);
Scenarios.Dictionary_Float32Value_put = passOnSuccess(Float32ValueMock.put);

const DatetimeValueMock = createModelMockApis("dictionary/datetime", { k1: "2022-08-26T18:38:00Z" });
Scenarios.Dictionary_DatetimeValue_get = passOnSuccess(DatetimeValueMock.get);
Scenarios.Dictionary_DatetimeValue_put = passOnSuccess(DatetimeValueMock.put);

const DurationValueMock = createModelMockApis("dictionary/duration", { k1: "P123DT22H14M12.011S" });
Scenarios.Dictionary_DurationValue_get = passOnSuccess(DurationValueMock.get);
Scenarios.Dictionary_DurationValue_put = passOnSuccess(DurationValueMock.put);

const UnknownValueMock = createModelMockApis("dictionary/unknown", { k1: 1, k2: "hello", k3: null });
Scenarios.Dictionary_UnknownValue_get = passOnSuccess(UnknownValueMock.get);
Scenarios.Dictionary_UnknownValue_put = passOnSuccess(UnknownValueMock.put);

const ModelValueMock = createModelMockApis("dictionary/model", {
  k1: { property: "hello" },
  k2: { property: "world" },
});
Scenarios.Dictionary_ModelValue_get = passOnSuccess(ModelValueMock.get);
Scenarios.Dictionary_ModelValue_put = passOnSuccess(ModelValueMock.put);

const RecursiveValueMock = createModelMockApis("dictionary/model/recursive", {
  k1: { property: "hello", children: {} },
  k2: { property: "world", children: { "k2.1": { property: "inner world" } } },
});
Scenarios.Dictionary_RecursiveModelValue_get = passOnSuccess(RecursiveValueMock.get);
Scenarios.Dictionary_RecursiveModelValue_put = passOnSuccess(RecursiveValueMock.put);