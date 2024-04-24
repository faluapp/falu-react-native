package io.faluidentityreactnative

import android.os.Bundle
import android.util.Log
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.ReadableType

fun ReadableMap?.toBundle(): Bundle {
  val result = Bundle()
  if (this == null) {
    return result
  }
  val iterator = this.keySetIterator()
  while (iterator.hasNextKey()) {
    val key = iterator.nextKey()
    when (this.getType(key)) {
      ReadableType.Null -> result.putString(key, null)
      ReadableType.Boolean -> result.putBoolean(key, this.getBoolean(key))
      ReadableType.Number -> try {
        result.putInt(key, this.getInt(key))
      } catch (e: Exception) {
        result.putDouble(key, this.getDouble(key))
      }

      ReadableType.String -> result.putString(key, this.getString(key))
      ReadableType.Map -> result.putBundle(key, this.getMap(key)?.toBundle())
      ReadableType.Array -> Log.e(
        "ReadableMap",
        "Cannot put arrays of objects into bundles. Failed on: $key."
      )

      else -> Log.e("ReadableMap", "Could not convert object with key: $key.")
    }
  }

  return result
}
